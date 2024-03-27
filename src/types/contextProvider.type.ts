export type ProviderProps = {
  children: React.ReactNode;
};

export type ISaveDetailContextValue = {
  url: string | null;
};

export type ISaveDetailContextType = {
  saveDetails: ISaveDetailContextValue;
  setSaveDetails: React.Dispatch<React.SetStateAction<ISaveDetailContextValue>>;
};

export type IUserCTXType = {
  exp: number;
  id: string;
  user_id: string;
  email: string;
  password: string;
  image: string;
  full_name: string;
  isEmail_verified: boolean;
  category_type: string;
  user_type: string;
  pentrar_id: string;
  status: string;
  phone_number: string;
  last_login: string;
  created_at: string;
  role: string;
  gender: string;
  coy_name: string;
  reg_number: string;
  tin_id: string;
  coy_address: string;
};

export type IGetTokenType = {
  email: string;
};

export type IError = {
  message: string;
};

export type IGetToken = {
  token: string;
};

export type IQuestionObj = {
  question: string;
  options: string[];
};

export type IQuestion = {
  [x: string]: IQuestionObj;
};

export type IQuestionProps = {
  QuesProp: {
    title: string;
    incomingQuestion: IQuestionObj | null;
    quesClassName: string;
    id?: string;
    closeModal?: () => void;
  };
};
