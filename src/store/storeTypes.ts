interface Source {
    label: string,
    name: string,
    key: string,
    checked: boolean
}

interface SourceWithParams extends Source {
    parameters: {
        definition: boolean,
        pronunciations: boolean,
        audio: boolean,
        examples: boolean,
    }
}
type History = {
    content: string,
    date: string,
    id: string
}
type User = {
    user: {
        token: string,
        username: string
    },
    history: [] | History[]

}

export type RootState = {
    user: null | User,
    query:{
      query: string,
      history: [] | History[]
    },
    parameters:{
        ui:{
            theme: string,
            themeCC: string,
            textResultFontFamily: string,
            textResultFontSize: number,
        },
        sources: {
            urban: Source,
            wordnet: Source,
            babelnet: Source,
            meriamL: Source,
            meriamC: Source,
            wordnik: SourceWithParams
        }
    }
  }