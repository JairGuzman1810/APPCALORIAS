export type PostImage = {
  date?: string;
  explanation?: string;
  hdurl?: string;
  media_type?: string;
  service_version?: string;
  title?: string;
  url?: string;
};
//Se pone el ? para que sea opcional.

export type RootStackParamsList = {
  Home: undefined;
  AddFood: PostImage;
};
