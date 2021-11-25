export class NoteService {
  static async getNoteListData(id: string) {
    const result = await fetch(`http://localhost:3000/api/noteList?id=${encodeURI(id)}`).then(res =>
      res.json()
    );

    return result;
  }
  static async getNotePageData(id: string, owner: string) {
    const result = await fetch(
      `http://localhost:3000/api/notePage?id=${encodeURI(id)}&owner=${encodeURI(owner)}`
    ).then(res => res.json());

    return result.contents;
  }
  static async updateNotePageData(
    pageId: string,
    owner: string,
    content: string,
    contentId: string
  ) {
    await fetch(`http://localhost:3000/api/notePage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pageId, owner, content, contentId })
    }).then(res => res.json());
  }
}
