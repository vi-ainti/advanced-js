let text = `Handel returned to London in August 1742 and prepared the oratorio for the London stage. 'The Messiah' made its London debut on March 23, 1743, with King George II in the audience. It was during the Hallelujah Chorus that the King jumped to his feet and so initiated a tradition that has lasted ever since.
With such oratories, Handel was able to re-establish his popularity and restore his finances in London. 'The Messiah' continued to be performed. After conducting it on April 6, 1759, the old composer collapsed and had to be carried home. He died eight days later.
'The Messiah' remains Handel's most popular work, combining wonderful music with inspiring religious sentiments. The Biblical text speaks of hope and salvation, and the music allows the text to soar into angelic songs.`

let textImproved = text;
const regexp1 = new RegExp('\'', 'g');
document.querySelector('.goods-list').textContent = text;

text = text.replace(regexp1, '\"');
document.querySelector('.goods-list2').textContent = text;

let regexp2 = new RegExp('\'[^A-Za-z0-9_]', 'g');
textImproved = textImproved.replace(regexp2, '\" ');
document.querySelector('.goods-list3').textContent = textImproved;
