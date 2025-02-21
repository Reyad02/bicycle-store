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
    <div style={{ marginBottom: "16px" }}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Textarea
            placeholder={placeholder}
            {...field}
            disabled={disabled}
            className="border-dashed border-2 border-[#a5a5a5]"
          />
        )}
      />
    </div>
  );
};

export default CustomTextArea;
