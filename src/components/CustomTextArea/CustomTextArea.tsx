import { Controller, useFormContext } from "react-hook-form";
import { Textarea } from "../ui/textarea";

interface ICustomTextArea {
  name: string;
  placeholder?: string;
  disabled?: boolean;
}
const CustomTextArea = ({ name, placeholder, disabled }: ICustomTextArea) => {
  const { control } = useFormContext();

  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Textarea placeholder={placeholder} {...field} disabled={disabled} />
        )}
      />
    </div>
  );
};

export default CustomTextArea;
