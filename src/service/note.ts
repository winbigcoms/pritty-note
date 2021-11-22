export class NoteService {
  static async getNoteListData(id: string) {
    const result = await fetch(`/api/noteList?id=${id}`).then(res => res.json());

    return result;
  }
  static async getNotePageData(id: string, owner: string) {
    const result = await fetch(`/api/notePage?id=${id}&owner=${owner}`).then(res => res.json());

    console.log(result);

    return result.contents;
  }
}
