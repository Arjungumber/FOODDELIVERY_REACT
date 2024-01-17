import React from "react";
import { useForm } from "react-hook-form";
import Title from "../Title/Title";
import Input from "../input/input";
import Button from "../Button/Button";
import { useAuth } from "../../hooks/useAuth";

export default function ChangePassword() {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

const {changePassword} = useAuth();

  const submit = (passwords) => {
    changePassword(passwords);
  };

  return (
    <div>
      <Title title="Change Password" />
      <form onSubmit={handleSubmit(submit)}>
        <Input
        type='password'
        label='Current Password'
        {...register('Current Password',{
            required:true,
        })}
        error={errors.currentPassword}
        />
       <Input
        type='password'
        label='New Password'
        {...register('newPassword',{
            required:true,
            minLength:5,
        })}
        error={errors.newPassword}
        />
        <Input
        type='password'
        label='Confirm Password'
        {...register('confirmPassword',{
            required:true,
            validate:value =>
            value != getValues('newPassword')
            ?'Passwords Do Not Match'
            : true,
        })}
        error={errors.confirmNewPassword}
        />
        <Button type='submit' text='Change'/>
      </form>
    </div>
  );
}
