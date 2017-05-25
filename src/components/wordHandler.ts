import * as WebRequest from "web-request";

export interface IWordHandler {
    getNouns(text: string): Promise<string[]>;
}

export class WordHandler implements IWordHandler {
    constructor() {
    }

    async getNouns(text: string): Promise<string[]> {
        const words = text.split(" ");
        const toreturn: string[] = [];
        for (const word in words) {
            if (words.hasOwnProperty(word)) {
                const element = words[word];
                const isNoun = this.isNoun(element);
                if (isNoun) {
                    toreturn.push(element);
                }
            }
        }
        return toreturn;
    }

     async isNoun(word: string): Promise<boolean> {
        const defintiion = await this.getWordDefinition(word);
        return defintiion.partOfSpeech === "noun";
    }

    async getWordDefinition(word: string) {
        const result = await WebRequest.get("http://api.wordnik.com:80/v4/word.json/" + word + "/definitions?limit=1&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5");
        return JSON.parse(result.content);
    }
}