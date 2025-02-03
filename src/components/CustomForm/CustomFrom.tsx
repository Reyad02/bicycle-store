import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

interface ICustomForm {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
}
const PayFrom = ({ onSubmit, children }: ICustomForm) => {
  const methods = useForm();
  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    console.log(data);
    methods.reset();
  };
  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submit)}>{children}</form>
      </FormProvider>
    </div>
  );
};

export default PayFrom;
