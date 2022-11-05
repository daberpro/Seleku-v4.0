import { Tokenizer } from "./Tokenizer.js";
import { readFileSync } from "fs";
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

console.log(Tokenizer(readFileSync(__dirname+'/../test-resource/a.selek').toString()));
