
document.addEventListener('DOMContentLoaded', async function () {
    console.log('Page loaded!');

    console.log(await NotesAPI.get(1));
    await NotesAPI.update(1, {content: 'update'});
    console.log(await NotesAPI.get(1));
});