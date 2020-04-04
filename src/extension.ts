// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {ExtensionContext, TextEditor, window, Range, Position} from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
    window.onDidChangeActiveTextEditor((editor) => {
        if(!editor) { return; }
        const allText: string = editor.document.getText();
        const first: Position = editor.document.positionAt(0);
        const last: Position = editor.document.positionAt(allText.length);
        editor.setDecorations(
            window.createTextEditorDecorationType(
                {
                    color: "#F00"
                }
            ), 
            [new Range(first, last)]
        );
    });
}

// this method is called when your extension is deactivated
export function deactivate() { }
