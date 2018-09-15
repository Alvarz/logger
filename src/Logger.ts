import * as path from 'path'
import * as fs from 'fs'

export default class Logger {

  private static logType : Array<any> = { 1 : 'ERROR', 2 : 'WARNING', 3: 'LOG'} 

  private static logPathAndFile : string = '../storage/bearded.log';

  private static appDir : string = path.dirname(require.main.filename);
 
  /*
   *
   * description
   *
   * @param
   *
   * @return
   * */
  public static warning (message : string) : void{

    const msg = Logger.msgFormatter(2, message);
    console.warn(msg.slice(0, -2));
    Logger.logToFile(msg);
  }

  /*
   *
   * description
   *
   * @param
   *
   * @return
   * */
  public static info (message : string) : void{

    const msg = Logger.msgFormatter(3, message);
    console.log(msg.slice(0, -2));
    Logger.logToFile(msg);
  } 

  /*
   *
   * description
   *
   * @param
   *
   * @return
   * */
  public static count (label : string) : void{

    console.count(label);
  
  }
  
  /*
   *
   * description
   *
   * @param
   *
   * @return
   * */
  public static assert (message : string) : void{
  
    console.assert(false, "You have no element with ID 'demo'");
  
  }

  /*
   *
   * description
   *
   * @param
   *
   * @return
   * */
  public static error (message : string,  err = null) : void{

    //const caller_line = err.stack.split("\n")[4];
    //const index = caller_line.indexOf("at ");
    //const clean = caller_line.slice(index+2, caller_line.length);
    
    const msg = Logger.msgFormatter(1, message);
    
    if(err != null){
      console.error(msg.slice(0, -2), err);
      Logger.logToFile(msg, err);
      return;
    }
    console.error(msg.slice(0, -2));
    Logger.logToFile(msg);
    console.trace();
  }

  /*
   *
   * description
   *
   * @param
   *
   * @return
   * */
  private static logToFile(msg : string,   errTop = null){

    /*if(errTop)
      msg += `${errTop.name} \n`;*/

    fs.appendFile(`${Logger.appDir}/${Logger.logPathAndFile}`, msg, function(err) {
        if(err) {
            return console.error(Logger.logType[1], 'There was an error writing the file', err);
        }
      //console.log(Logger.msgFormatter(3, 'log writed on file succefully'));
    }
  }

  /*
   *
   * description
   *
   * @param
   *
   * @return
   * */
  private static msgFormatter(logType : int, message : string){
  
    return `${Logger.logType[logType]} | msg: ${message} | file: ${Logger.fileName()} \n`;
  
  }

  /*
   *
   * description
   *
   * @param
   *
   * @return
   * */
  private static fileName(){
  
    return path.basename(__filename);
  }



}
