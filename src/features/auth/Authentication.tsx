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
import {
  useCreateUsersMutation,
  useLoginMutation,
} from "@/redux/slices/authApiSlice";
import { addToken, addUser } from "@/redux/slices/authSlice";
import Spinner from "@/ui/shared/Spinner";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { MdMarkEmailRead } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Authentication() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createUser, { isLoading: isCreating, isError, error }] =
    useCreateUsersMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm((prevForm) => ({
      ...prevForm,
      [name]: value, // Update the specific field
    }));
  };
  const handleGoogleAuth = useGoogleLogin({
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (error) => {
      console.log("Failed to login", error);
    },
  });
  const handleRegister = async () => {
    const { name, email, password, cPassword } = registerForm;
    if ([name, email, password, cPassword].some((item) => item.trim() === "")) {
      toast.error("All Fields are required");
    }
    if (password !== cPassword) {
      toast.error("Password and confirm password didn't match");
    }
    try {
      const response = await createUser({ name, email, password }).unwrap();
      console.log("register response", response);
      toast.success("User Registered successfully");
      toast.success("Please Login to your account");
      setRegisterForm({
        name: "",
        email: "",
        password: "",
        cPassword: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to create user, please check your credentials");
    }
  };
  const handleLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prevForm) => ({
      ...prevForm,
      [name]: value, // Update the specific field
    }));
  };
  const handleLogin = async () => {
    const { email, password } = loginForm;
    if (!(email && password)) {
      toast.error("All fields are required");
    }
    try {
      const response = await login({ email, password }).unwrap();
      const { user, token } = response;
      dispatch(addUser(user));
      dispatch(addToken(token));
      if (token) {
        localStorage.setItem("accessToken", token.accessToken);
        localStorage.setItem("refreshToken", token.refreshToken);
      }
      toast.success("User logged in successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your credentials.");
    }
  };
  if (isError) {
    toast.error(`Failed to create user : ${error}`);
    console.log(error);
  }
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
                  <Label htmlFor="name">
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    name="name"
                    placeholder="Rahul Mijar"
                    value={registerForm.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={registerForm.email}
                    onChange={handleChange}
                    name="email"
                    type="email"
                    placeholder="rahul.mijar@gmail.com"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={registerForm.password}
                    onChange={handleChange}
                    name="password"
                    type="password"
                    placeholder="*********"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="cPassword">
                    Confirm Password <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={registerForm.cPassword}
                    onChange={handleChange}
                    name="cPassword"
                    type="password"
                    placeholder="*********"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className={`${open ? "block" : "hidden"}`}>
              <Button
                disabled={isCreating}
                className="text-base"
                onClick={handleRegister}
              >
                {isCreating ? (
                  <div className="space-x-2 items-center">
                    <span>
                      <Spinner />
                    </span>
                    <span>Loading</span>
                  </div>
                ) : (
                  "Continue with Email"
                )}
              </Button>
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
                    value={loginForm.email}
                    onChange={handleLoginFormChange}
                    name="email"
                    type="email"
                    placeholder="rahul.mijar@gmail.com"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginFormChange}
                    type="password"
                    placeholder="*********"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleLogin} disabled={isLoggingIn}>
                {isLoggingIn ? (
                  <div className="space-x-2 items-center">
                    <span>
                      <Spinner />
                    </span>
                    <span>Loading</span>
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
export default Authentication;
