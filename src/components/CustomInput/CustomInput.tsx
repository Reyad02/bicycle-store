import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
interface ICustomInput {
  type: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
}
const PayInput = ({ type, name, placeholder, disabled }: ICustomInput) => {
  const { control } = useFormContext();

  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            placeholder={placeholder}
            type={type}
            {...field}
            disabled={disabled}
          />
        )}
      />
    </div>
  );
};

export default PayInput;
