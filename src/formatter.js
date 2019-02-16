const formatter = ({
    compactWhiteSpace(value) {
        //compress spaces not in quotes
        var str = value.replace(/\s+(?=((\\[\\"]|[^\\"])*"(\\[\\"]|[^\\"])*")*(\\[\\"]|[^\\"])*$)/gm, ' ');
        //remove extra spaces between (
        str = str.replace(/(?<=\()\s*(?=\()/gm, '');
        //remove extra spaces between )
        str = str.replace(/(?<=\))\s*(?=\))/gm, '');
        return str;
    },
    parseQuery(str) {
        var i = 0;
        var depth = 0;
        var result = '';
        var part = '';
        while (i < str.length) {
            if (str.charAt(i) === '(') {
                part = part.trim();
                //if the last character was '(' ignoring whitespace, the part being printed has content,  this not the first open bracket in a block and the last character printed was not a ":"
                if (result.match(/\([\s]*$/gm) && part.length > 0 && depth > 0 && !part.match(/:$/)) {
                    result += this.nextLine(depth);
                }
                result += part.trim();
                //if part does not contain + or - or :
                if (!part.match(/[+-:]/gm)) {
                    result += this.nextLine(depth);
                }
                depth++;
                part = '';
                result += str.charAt(i);

            } else if (str.charAt(i) === ')') {
                //if the last character printed was ) start a new line indented 1 less than the current depth
                //Also skip this if the last set to brackets was defining the field value
                if ((result.charAt(result.length - 1) === ')' && result.charAt(result.lastIndexOf('(') - 1) !== ':') || result.match(/\)\)$/g)) {
                    result += this.nextLine(depth - 1);
                }
                result += part.trim();
                depth--;
                result += str.charAt(i);
                part = '';
                //If this the end of one query block add a new line
                if (depth === 0) {
                    result += '\n';
                }
            } else {
                part += str.charAt(i);
            }
            i++;
        }
        return result;
    },
    nextLine(depth) {
        var str = '\n';
        if (depth > 0) str += '\t'.repeat(depth);
        return str;
    }
})

export default formatter;