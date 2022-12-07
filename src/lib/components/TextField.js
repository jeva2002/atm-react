import TextFieldMaterial from '@mui/material/TextField';
import { useField } from 'formik';

const TextField = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);

  const configTextField = {
    ...field,
    ...otherProps,
    fullWidth: true,
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return <TextFieldMaterial type='number' {...configTextField} />;
};

export default TextField;
