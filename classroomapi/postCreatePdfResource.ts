import { fetchBaseRequest } from 'classroomapi/useBaseRequest'
import { AuthContextProps } from 'contexts/AuthContext'
import Resource from 'models/Resource'

interface PostCreatePdfResourceProps {
  courseId: string;
  name: string;
  description: string;
  file: File;
}

export const postCreatePdfResource = (authState: AuthContextProps, props: PostCreatePdfResourceProps): Promise<Resource> => {

  const { credentials = "" } = authState;

  let formData = new FormData();
  formData.set("name", props.name);
  formData.set("description", props.description);
  formData.set("type", "PDF");
  formData.append("file", props.file, props.file.name);

  return fetchBaseRequest({
    path: "resource/" + props.courseId + "/",
    method: "POST",
    body: formData,
    bodyType: "formdata",
    credentials,
  });
}

export default postCreatePdfResource