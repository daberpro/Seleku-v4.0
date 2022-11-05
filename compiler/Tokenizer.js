/**
 * Creating Token from raw syntax of seleku
 * 
 */

/**
 * 
 * @param {String} syntax 
 * @returns {Array<Object>}
 */
export function Tokenizer(syntax = "") {

    const token = [];
    const raw_token = syntax.split(/\n/igm).map((_token, index) => {
        let result = _token.match(/<[a-zA-Z]+(>|.*?[^?]>)|<\/[a-zA-Z]+(>|.*?[^?]>)/igm);
        if (result) {
            result = result.map(d => ({ token: d, col: _token.indexOf(d) }));
        } else {
            result = [];
        }
        return result;
    }).filter(d => d);

    for (let line = 0; line < raw_token.length; line++) {
        for (let x = 0; x < raw_token[line].length; x++) {
            // get location of row and column
            const kind = (/<[a-zA-Z]+(>|.*?[^?]>)/igm.test(raw_token[line][x].token)) ? 'Open Tag' : (/<\/[a-zA-Z]+(>|.*?[^?]>)/igm.test(raw_token[line][x].token) ? 'Close Tag' : 'Open And Close');
            const type = (!/<[a-zA-Z]+(>|.*?[^?]\/>)/igm.test(raw_token[line][x].token) ? 'Multi Tag' : 'Single Tag');
            if (/<[a-zA-Z]+(>|.*?[^?]>)|<\/[a-zA-Z]+(>|.*?[^?]>)/igm.test(raw_token[line][x].token)) {
                token.push({
                    location: {
                        line: line + 1,
                        startCol: raw_token[line][x].col,
                        endCol: raw_token[line][x].col + raw_token[line][x].token.length,
                    },
                    token: raw_token[line][x].token,
                    kind,
                    type,
                });
            }

        }
    }

    return token;

}