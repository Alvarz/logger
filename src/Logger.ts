import * as path from 'path'
import * as fs from 'fs'

export default class Logger {

  /*
   *
   * @var Array the type if log
   *
   * */
  private static logType : object = { 1 : 'ERROR', 2 : 'WARNING', 3: 'LOG'} 

  /*
   *
   * @var string the path and filename to save the log
   *
   * */
  private static logPathAndFile : string = '../storage/bearded.log';

  /*
   *
   * @var string the root path of the app
   *
   * */
  private static appDir : string = path.dirname(require.main.filename);
 
  /*
   *
   * The log of warning
   *
   * @param string message
   *
   * @return void
   * */
  public static warning (...args) : void{

    console.log(args)
    if(args.length > 1){
      
      args.unshift(Logger.logType[2])
      console.warn(...args);
      return
    }
    const msg = Logger.msgFormatter(2, args[0]);
    Logger.logToFile(msg);
  }

  /*
   *
   * The log of info
   *
   * @param string message
   *
   * @return void
   * */
  public static info (...args) : void{

    if(args.length > 1){
      
      args.unshift(Logger.logType[3])
      console.log(...args);
      return
    }
    const msg = Logger.msgFormatter(3, args[0]);
    console.log(msg.slice(0, -2));
    Logger.logToFile(msg);
  } 

  /*
   *
   * The log of count
   *
   * @param string lable
   *
   * @return void
   * */
  public static count (label : string) : void{

    console.count(label);
  
  }
  
  /*
   *
   * The log lod assert
   *
   * @param string message
   *
   * @return void
   * */
  public static assert (message : string) : void{
  
    console.assert(false, "You have no element with ID 'demo'");
  
  }

  /*
   *
   * The log of error
   *
   * @param string message
   * @param error err
   *
   * @return void
   * */
  public static error (...args) : void{

    //const caller_line = err.stack.split("\n")[4];
    //const index = caller_line.indexOf("at ");
    //const clean = caller_line.slice(index+2, caller_line.length);
    
    if(args.length > 1){
      
      args.unshift(Logger.logType[1])
      console.error(...args);
      return
    }

    const msg = Logger.msgFormatter(1, args[0]);

    const err = args[err];
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
   * The log on file 
   *
   * @param string message
   * @param error errTOp
   *
   * @return void
   * */
  private static logToFile(msg : string,   errTop = null) : void{

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
   * message formatter
   *
   * @param int logType
   * @param string message
   *
   * @return void
   * */
  private static msgFormatter(logType : int, message : string){
  
    return `${Logger.logType[logType]} | msg: ${message} | file: ${Logger.fileName()} \n`;
  
  }

  /*
   *
   * name of the current file
   *
   * @return string
   * */
  private static fileName() : string{
  
    return path.basename(__filename);
  }

}
