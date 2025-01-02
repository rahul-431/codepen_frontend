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
import {
  useCreateNewCollectionMutation,
  useUpdateCollectionApiMutation,
} from "@/redux/slices/collectionApiSlice";
import { addCollection } from "@/redux/slices/collectionSlice";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { toast } from "sonner";
type CollectionForm = {
  title: string;
  description: string;
};
export function CreateNewCollection({
  edit = false,
  title,
  id,
  desc,
}: {
  edit: boolean;
  id?: string;
  title?: string;
  desc?: string;
}) {
  const [form, setForm] = useState<CollectionForm>({
    title: edit && title ? title : "",
    description: edit && desc ? desc : "",
  });
  const [createCollection] = useCreateNewCollectionMutation();
  const [updateCollection] = useUpdateCollectionApiMutation();
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
      if (!edit) {
        const res = await createCollection({
          title: form.title,
          description: form.description,
          accessToken,
        });
        res.data && addCollection(res.data);
        toast.success("Collection created successfully");
      } else {
        const res = await updateCollection({
          id: id,
          title: form.title,
          description: form.description,
          accessToken,
        });
        if (res.data && res.data?._id) {
          toast.success("Collection updated successfully");
        }
      }
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        {edit ? (
          <button className="hover:bg-[#272831] p-3 bg-[#1E1F26] rounded-md text-xl">
            <FaEdit />
          </button>
        ) : (
          <button className="p-2 rounded-md bg-green-900 hover:bg-green-600">
            Create New Collection
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-primary text-white">
        <DialogHeader>
          <DialogTitle>
            {edit ? "Edit collection" : "Create New Collection"}
          </DialogTitle>
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
            {edit ? "Edit" : "Create"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
