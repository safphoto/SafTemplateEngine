var SAF = SAF || {};

SAF.TemplateEngine = {};

(function(engine) {
    'use strict';

    var re = /<%([^%>]+)?%>/g;
    var reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g;
    var code = 'var r=[];\n';

    engine.execute = function (html, options) {
        var cursor = 0;

        code ='var r=[];\n';

        var match;
        while(match = re.exec(html)) {
            add(html.slice(cursor, match.index))(match[1], true);
            cursor = match.index + match[0].length;
        }

        add(html.substr(cursor, html.length - cursor));
        code += 'return r.join("");';

        return function(code.replace(/[\r\t\n]/g, '')).apply(options);
    };

    var add = function(line, js) {
        js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line !== '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    };
}(SAF.TemplateEngine));