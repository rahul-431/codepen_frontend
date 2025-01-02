import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateNewCollectionMutation } from "@/redux/slices/collectionApiSlice";
import { addCollection } from "@/redux/slices/collectionSlice";
import { useRef, useState } from "react";
import { toast } from "sonner";
type CollectionForm = {
  title: string;
  description: string;
};
export function CreateNewCollection() {
  const [form, setForm] = useState<CollectionForm>({
    title: "",
    description: "",
  });
  const [createCollection, { data }] = useCreateNewCollectionMutation();
  const accessToken = localStorage.getItem("accessToken");
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value, // Update the specific field
    }));
  };
  const handleClick = async () => {
    if (form.title.trim() === "") {
      toast.error("Title is required");
    }
    if (accessToken) {
      await createCollection({
        title: form.title,
        description: form.description,
        accessToken,
      });
      data && addCollection(data);

      toast.success("Collection created successfully");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-2 rounded-md bg-green-900 hover:bg-green-600">
          Create New Collection
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-primary text-white">
        <DialogHeader>
          <DialogTitle>Create New Collection</DialogTitle>
          <DialogDescription>
            Organize your pens in collection to make specific project.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-col gap-2 items-start">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              name="title"
              id="title"
              value={form.title}
              onChange={handleChange}
              placeholder="First collection"
            />
          </div>
          <div className="flex flex-col gap-2 items-start">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              name="description"
              id="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Type description here"
            />
          </div>
        </div>
        <DialogFooter>
          <button
            onClick={handleClick}
            className="p-2 rounded-md bg-green-900 hover:bg-green-600"
          >
            Create
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
