'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { HarbourEngine } from './bout/node/harbourEngine'
// import { ENGINE_METHOD_ALL } from 'constants';

export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "eshell1" is now active!');

    cmd1(context);
    cmd2(context);
}


function cmd1(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.eShellHello', async () => {
        let helloSay = async () => {
            /*     
            return await vscode.window.showInputBox({
                prompt: "Šta da kažem?",
                ignoreFocusOut: true
            });
            */

           const engine = new HarbourEngine();
           
           engine.provideVersion().then( ret => {
               vscode.window.showInformationMessage(`harbour version  ${ret.answer}`) 
            });


           return await vscode.window.showQuickPick(["Haso", "Huso", "Mujo"]);
           
        };
        
        let sayThis = await helloSay();
        if (sayThis) {
            vscode.window.showInformationMessage(sayThis, "a", "b", "c");
            // vscode.window.createTerminal("F18", "/home/hernad/F18_knowhow/F18.sh");
        }

        
    });

    context.subscriptions.push(disposable);
}

function createHtmlDocumentWithBody(body: string): string {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
</head>
<body>
	${body}
</body>
</html>`;
}



/*
function sendRecieveMessage<T = {}, R = any>(webview: vscode.WebviewPanel, message: T): Promise<R> {
	const p = getMesssage<R>(webview);
	webview.webview.postMessage(message);
	return p;
}
*/

function cmd2(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.eShellWebPanel', async () => {
        
        
        const webView1 = vscode.window.createWebviewPanel("view1", 'Web Panel 1', 
          { viewColumn: vscode.ViewColumn.One }, 
          { enableScripts: true }
        );
        
        const engine = new HarbourEngine();
           
        engine.provideVersion().then( ret => {
            // vscode.window.showInformationMessage(`harbour version  ${ret.answer}`) 
            webView1.webview.postMessage({ value: ret.answer });
        });

        webView1.webview.html = createHtmlDocumentWithBody(`
            <h1>Hello from Web panel 1</h1>
            <div id="root"></div>
            <p/>
            <button onclick="sendViaButtonPoruku()">Pošalji poruku 505</button>

			<script>
				const vscode = acquireVsCodeApi();
				window.addEventListener('message', (message) => {
                    // vscode.postMessage({ value: message.data.value + 100 });
                    var element = document.getElementById("root");
                    element.innerHTML='<b>' + message.data.value + '</b>';
                });
                
                function sendViaButtonPoruku() {
                    console.log('hello from webview panel 1');
                    vscode.postMessage({ value: 505 });
                }
			</script>`);

        // const firstResponse = getMesssage(webView1);
        // console.log( await firstResponse );

        webView1.webview.onDidReceiveMessage(message => {
            vscode.window.showInformationMessage("onDidReceiveMessage from webpanel:" + message.value.toString());
        });

        
        
		
    });

    context.subscriptions.push(disposable);
}


// this method is called when your extension is deactivated
export function deactivate() {
}