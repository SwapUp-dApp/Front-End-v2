import { cn, generateRandomKey } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";


import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProfileStore } from "@/store/profile";
import { useState } from "react";
import CustomOutlineButton from "../shared/CustomOutlineButton";
import CustomAvatar from "../shared/CustomAvatar";
import { Input } from "@/components/ui/input";
import { Schema_ProfileEditAvatarForm } from "@/schema";

interface IProp {
  children?: any;
  className?: string;
}


const EditProfileImageDialog = ({ children, className }: IProp) => {
  const [profile, setProfileAvatar] = useProfileStore(state => [state.profile, state.setProfileAvatar]);
  const [currentAvatar, setCurrentAvatar] = useState(profile.avatar);
  const [formKey, setFormKey] = useState(generateRandomKey(6));

  const form = useForm<z.infer<typeof Schema_ProfileEditAvatarForm>>({
    resolver: zodResolver(Schema_ProfileEditAvatarForm),
    defaultValues: {
      profileImage: undefined,
    },
  });

  const { errors } = form.formState;

  const onSubmit = (values: z.infer<typeof Schema_ProfileEditAvatarForm>) => {
    const { profileImage } = values;

    if (profileImage) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result as string;
        setProfileAvatar(dataURL);
      };
      reader.readAsDataURL(profileImage);
    }

    setFormKey(generateRandomKey(6));
  };

  const handleSelectedImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let file: File;

    if (event.target && event.target.files && event.target.files.length > 0) {
      file = event.target.files[0];
    } else { return; }

    form.setValue("profileImage", file);
    const isValid = await form.trigger();
    if (!isValid) return;

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setCurrentAvatar(reader.result as string);
      };
    };
  };

  const handleRemoveProfileImage = () => {
    setProfileAvatar('');
    setCurrentAvatar('');
    form.reset();
    setFormKey(generateRandomKey(6));
  };

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "",
          className
        )}
      >
        {children}
      </DialogTrigger>

      <DialogContent className="w-[400px] p-4 px-6" >
        <div className="space-y-3" >
          {/* header */}
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <h2 className="font-bold text-xl pt-3" >Change your profile picture </h2>

              <DialogClose className="p-1 rounded-xs hover:bg-su_active_bg" >
                <svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </DialogClose>
            </div>

            <p className="text-base font-medium text-secondary dark:text-su_secondary">Upload an image to represent your identity.</p>
          </div>

          <Form {...form} key={formKey}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 items-center">

              <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center" >
                    <div className="relative" >
                      <Input
                        className="absolute z-10 w-full h-full rounded-full top-0 left-0 bg-transparent opacity-0 !cursor-pointer"
                        placeholder="select image"
                        id={field.name}
                        type="file"
                        accept="image/*"
                        onChange={(event) => { handleSelectedImage(event); }}
                      />

                      <CustomAvatar
                        className="cursor-pointer"
                        imageSrc={currentAvatar}
                        fallbackName={profile.title}
                        sizeClasses="w-16 h-16 lg:w-24 lg:h-24"
                        textSizeClasses="text-1.5xl lg:text-2.5xl"
                      />
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex justify-center items-center gap-3" >
                <CustomOutlineButton
                  className="px-[20px] py-2"
                  disabled={!currentAvatar}
                  onClick={handleRemoveProfileImage}
                >
                  Remove
                </CustomOutlineButton>

                <div className="relative" >
                  <CustomOutlineButton className="px-[20px] py-2">
                    Replace
                  </CustomOutlineButton>

                  <FormLabel htmlFor="profileImage" className="absolute top-0 left-0 w-full h-full cursor-pointer" />
                </div>
              </div>

              <FormLabel
                htmlFor="profileImage"
                className="text-su_secondary text-sm font-semibold cursor-pointer"
              >
                Image requirements: .jpeg, jpg, .png or .gif file.
              </FormLabel>

              <Button
                type="submit"
                className="w-full"
                disabled={!form.watch('profileImage') && !errors.profileImage?.message}
              >
                Apply Changes
              </Button>

            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog >
  );
};

export default EditProfileImageDialog;