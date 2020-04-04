// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {ExtensionContext, TextEditor, window, Range, Position, TextEdit, TextEditorCursorStyle, WindowState, TextEditorSelectionChangeEvent, TextEditorVisibleRangesChangeEvent} from "vscode";

const colors: string[] = ["#F70", "#FA0", "#FF0", "#AF0", "#0B0", "#0BB", "#08F", "#55F", "#95F", "#F5F"];

function decorate(editor : TextEditor) {
    const allText: string = editor.document.getText();
    const regex = /\w+/gi;
    var result, regExpExecArrays: RegExpExecArray[] = [];
    while( (result = regex.exec(allText)) ) {
        regExpExecArrays.push(result);
    }
    window.showInformationMessage(`Number of words${regExpExecArrays.length}`);
    regExpExecArrays.forEach((regExpExecArray, k) => {
        const first: Position = editor.document.positionAt(regExpExecArray.index);
        const last: Position = editor.document.positionAt(regExpExecArray.index + regExpExecArray[0].length);
        editor.setDecorations(
            window.createTextEditorDecorationType({
                color: colors[k % colors.length]
            }), 
            [new Range(first, last)]
        );
    });
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
    window.onDidChangeActiveTextEditor((editor) => {
        if(!editor) { return; }
        decorate(editor);
    });
    window.onDidChangeTextEditorVisibleRanges((editorVisibleRangesEvent: TextEditorVisibleRangesChangeEvent) => {
        const editor = editorVisibleRangesEvent.textEditor;
        if (!editor) { return; }
        decorate(editor);
    });
    window.onDidChangeTextEditorSelection((editorSelectionEvent: TextEditorSelectionChangeEvent) => {
        if(!editorSelectionEvent) { return; }
        const editor = editorSelectionEvent.textEditor;
        if(!editor) { return; }
        decorate(editor);
    });
}

// this method is called when your extension is deactivated
export function deactivate() { }
