import { Client } from "appwrite";
import { confi } from "../confi/confi";

export  const AppWriteConfig=new Client().setProject(confi.Project_id,confi.AppWrite_url)