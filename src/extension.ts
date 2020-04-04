// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {ExtensionContext, TextEditor, window, Range, Position, TextEdit} from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
    window.onDidChangeActiveTextEditor((editor) => {
        if(!editor) { return; }
        const allText: string = editor.document.getText();
        const regex = /[\s]/gi;
        var result, indices: number[] = [];
        while( (result = regex.exec(allText)) ) {
            indices.push(result.index);
        }
        const colors: string[] = [
            "#F00", "#FF0", "#0F0", "#0FF", "#00F", "#F0F"
        ];
        window.showInformationMessage(`Number of words${indices.length}`)
        indices.forEach((_, k) => {
            if(k !== 0){
                const first: Position = editor.document.positionAt(indices[k-1]);
                const last: Position = editor.document.positionAt(indices[k]);
                editor.setDecorations(
                    window.createTextEditorDecorationType(
                        {
                            color: colors[k%colors.length]
                        }
                    ), 
                    [new Range(first, last)]
                );
            }
        })
    });
}

// this method is called when your extension is deactivated
export function deactivate() { }
