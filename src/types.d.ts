import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Home: undefined;
  Create: undefined;
};

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "HomeScreen",
  "NoteScreen"
>;

type Note = {
  id?: number;
  image?: string;
  color: string;
  text: string;
};

type AssetImage = string & NodeRequire;
