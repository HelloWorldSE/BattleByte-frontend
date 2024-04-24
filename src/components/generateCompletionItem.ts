import * as monaco from 'monaco-editor';

export function generateCompletionItems(lineText : string) {
    const suggestions = [];

    // 根据不同的上下文生成不同的代码补全项
    if (lineText.includes('std::')) {
        suggestions.push({
            label: 'vector',
            kind: monaco.languages.CompletionItemKind.Class,
            insertText: 'vector',
            detail: 'Standard template library vector',
        });
        suggestions.push({
            label: 'string',
            kind: monaco.languages.CompletionItemKind.Class,
            insertText: 'string',
            detail: 'Standard template library string',
        });
        // 添加更多的代码补全项
    } else {
        suggestions.push({
            label: 'cout',
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: 'cout',
            detail: 'Output to console',
        });
        suggestions.push({
            label: 'cin',
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: 'cin',
            detail: 'Input from console',
        });
        // 添加更多的代码补全项
    }

    return suggestions;
}
