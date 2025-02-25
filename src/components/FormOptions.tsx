import MessageForm from "./forms/MessageForm";

// Return different form layout based on operation
const FormOptions = ({
  formView,
  operation,
  data,
  id }: {
    formView: 'message' | 'student' | 'teacher',
    operation: 'create' | 'update' | 'delete',
    data?: any,
    id?: string
  }) => {

  // define the forms object，key and method
  // return the form component based on the key and operation
  // For future expansion, add more forms here
  const forms: {
    [key: string]: (operation: 'create' | 'update', data?: any) => React.ReactElement;
  } = {
    message: (operation, data) => (
      <MessageForm operation={operation} data={data} />
    ),
  };

  switch (operation) {
    case 'delete':
      return null;
    case 'update':
      return id ? forms[formView](operation, data) : null;
    case 'create':
      return forms[formView](operation, data);
    default:
      return null;
  }
};

export default FormOptions