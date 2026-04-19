import { Client } from "appwrite";
import { confi } from "../confi/confi";

export  const AppWriteConfig=new Client().setProject(confi.Project_id).setEndpoint(confi.AppWrite_url)