import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateNewCollectionMutation } from "@/redux/slices/collectionApiSlice";
import { addCollection } from "@/redux/slices/collectionSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
type CollectionForm = {
  title: string;
  description: string;
};

const NewCollection = () => {
  const [form, setForm] = useState<CollectionForm>({
    title: "",
    description: "",
  });
  const [createCollection] = useCreateNewCollectionMutation();
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
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
      const res = await createCollection({
        title: form.title,
        description: form.description,
        accessToken,
      });

      res.data && addCollection(res.data);
      navigate("/app/your-work?tab=collections");
      toast.success("Collection created successfully");
    }
  };
  return (
    <div className="flex items-center justify-center my-auto">
      <div className="sm:max-w-[500px] bg-primary text-white flex flex-col gap-4 p-5 rounded-md">
        <div className="flex flex-col items-start gap-1">
          <h1 className="text-xl font-semibold">Create New Collection</h1>
          <p className="text-sm text-gray-300">
            Organize your pens in collection to make specific project.
          </p>
        </div>
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
        <div>
          <button
            onClick={handleClick}
            className="p-2 rounded-md bg-green-900 hover:bg-green-600"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewCollection;
