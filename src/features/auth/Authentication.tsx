import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { MdMarkEmailRead } from "react-icons/md";

function Authentication() {
  const [open, setOpen] = useState(false);
  const handleGoogleAuth = useGoogleLogin({
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (error) => {
      console.log("Failed to login", error);
    },
  });
  return (
    <div className="bg-black h-full w-full flex items-center justify-center">
      <Tabs defaultValue="login" className="w-full p-4 sm:w-[450px]">
        <TabsList className="grid w-full grid-cols-2 bg-[#1E1F26]">
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup" className="">
          <Card className="bg-black text-white">
            <CardHeader>
              <CardTitle className="text-lg">Account</CardTitle>
              <CardDescription>Register your account here</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className={`${open ? "hidden" : "flex"} flex-col gap-4`}>
                <Button
                  onClick={() => handleGoogleAuth()}
                  className="space-x-1"
                >
                  <span className="text-red-500">
                    <FaGoogle />
                  </span>
                  <span>Continue with Google</span>
                </Button>
                <Button className="space-x-2">
                  <span className="text-white">
                    <FaGithub />
                  </span>
                  <span>Continue with Github</span>
                </Button>
              </div>

              <h1 className={`text-center ${open ? "hidden" : "block"}`}>Or</h1>
              <Button onClick={() => setOpen((prev) => !prev)}>
                <span className="text-white">
                  {open ? <IoMdArrowBack /> : <MdMarkEmailRead />}
                </span>
                <span>{open ? "Back" : "Continue with Email"}</span>
              </Button>
              <div className={`space-y-2 ${open ? "block" : "hidden"}`}>
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Rahul Mijar" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="rahul.mijar@gmail.com"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="*********"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="cpassword">Confirm Password</Label>
                  <Input
                    id="cpassword"
                    type="password"
                    placeholder="*********"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className={`${open ? "block" : "hidden"}`}>
              <Button className="text-base">Continue with Email</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card className="bg-black text-white">
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Get access into your account here
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-col gap-4">
                <Button
                  onClick={() => handleGoogleAuth()}
                  className="space-x-1"
                >
                  <span className="text-red-500">
                    <FaGoogle />
                  </span>
                  <span>Continue with Google</span>
                </Button>
                <Button className="space-x-2">
                  <span className="text-white">
                    <FaGithub />
                  </span>
                  <span>Continue with Github</span>
                </Button>
              </div>

              <h1 className="text-center">Or</h1>
              <div className={`space-y-2`}>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="rahul.mijar@gmail.com"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="*********"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
export default Authentication;
