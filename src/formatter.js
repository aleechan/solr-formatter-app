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
    parseQuery(str,indentStr,maxLength) {
        var i = 0;
        var depth = 0;
        var result = '';
        var part = '';
        while (i < str.length) {
            if (str.charAt(i) === '(') {
                part = part.trim();
                //if the last character was '(' ignoring whitespace, the part being printed has content,  this not the first open bracket in a block and the last character printed was not a ":"
                if (result.match(/\([\s]*$/gm) && part.length > 0 && depth > 0 && !part.match(/:$/)) {
                    result += this.nextLine(depth,indentStr);
                }
                result += part.trim();
                //if part does not contain + or - or :
                if (!part.match(/[+-:]/gm)) {
                    result += this.nextLine(depth,indentStr);
                }
                depth++;
                part = '';
                result += str.charAt(i);

            } else if (str.charAt(i) === ')') {
                if (result.endsWith(":(") && part.length > maxLength) {
                    var parts = this.splitValue(part, maxLength);
                    var indent = result.match(/[^\s]*$/g)[0].length;
                    result += parts[0].trim();
                    for (var j = 1; j < parts.length; j++) {
                        result += this.nextLine(depth-2,indentStr);
                        result += ' '.repeat(indent);
                        result += parts[j].trim();
                    }
                    result += this.nextLine(depth-1,indentStr);
                    result +=  str.charAt(i);
                    depth--;
                    part = '';
                } else {
                    //if the last character printed was ) start a new line indented 1 less than the current depth
                    //Also skip this if the last set to brackets was defining the field value
                    if ((result.charAt(result.length - 1) === ')' && result.charAt(result.lastIndexOf('(') - 1) !== ':') || result.match(/\)\)$/g) || result.lastIndexOf('\n') > result.lastIndexOf('(')) {
                        result += this.nextLine(depth - 1,indentStr);
                    }
                    result += part.trim();
                    depth--;
                    result += str.charAt(i);
                    part = '';
                    //If this the end of one query block add a new line
                    if (depth === 0) {
                        result += '\n';
                    }
                }
            } else {
                part += str.charAt(i);
            }
            i++;
        }
        result += part;
        return result;
    },
    nextLine(depth,indentStr) {
        var str = '\n';
        if (depth > 0) str += indentStr.repeat(depth);
        return str;
    },
    splitValue(str, length) {
        var parts = [];
        var i = 0;
        var part = "";
        var canSplit = true;
        var inQuotes = false;
        while (i < str.length) {
            if (part.length > length && canSplit && !inQuotes) {
                parts.push(part);
                part = '';
            }
            var char = str.charAt(i);
            part += char;
            i++;
            if (char === '"') {
                inQuotes = !inQuotes;
            }
            if ("+- ".indexOf(char) > -1 ) {
                canSplit = false;
            } else {
                canSplit = true;
            }
        }

        parts.push(part);
        return parts;
    }
});

export default formatter;