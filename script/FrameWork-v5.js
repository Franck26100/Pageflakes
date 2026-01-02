
Function.__TypeName="Function";Function.__class=true;Function.createCallback=function(b,a){return function(){var e=arguments.length;if(e>0){var d=[];for(var c=0;c<e;c++)d[c]=arguments[c];d[e]=a;return b.apply(this,d)}return b.call(this,a)}};Function.createDelegate=function(a,b){return function(){return b.apply(a,arguments)}};Function.emptyFunction=Function.emptyMethod=function(){};Function._validateParams=function(e,c){var a;a=Function._validateParameterCount(e,c);if(a){a.popStackFrame();return a}for(var b=0;b<e.length;b++){var d=c[Math.min(b,c.length-1)],f=d.name;if(d.parameterArray)f+="["+(b-c.length+1)+"]";a=Function._validateParameter(e[b],d,f);if(a){a.popStackFrame();return a}}return null};Function._validateParameterCount=function(e,a){var c=a.length,d=0;for(var b=0;b<a.length;b++)if(a[b].parameterArray)c=Number.MAX_VALUE;else if(!a[b].optional)d++;if(e.length<d||e.length>c){var f=Error.parameterCount();f.popStackFrame();return f}return null};Function._validateParameter=function(c,a,h){var b,g=a.type,l=!!a.integer,k=!!a.domElement,m=!!a.mayBeNull;b=Function._validateParameterType(c,g,l,k,m,h);if(b){b.popStackFrame();return b}var e=a.elementType,f=!!a.elementMayBeNull;if(g===Array&&typeof c!=="undefined"&&c!==null&&(e||!f)){var j=!!a.elementInteger,i=!!a.elementDomElement;for(var d=0;d<c.length;d++){var n=c[d];b=Function._validateParameterType(n,e,j,i,f,h+"["+d+"]");if(b){b.popStackFrame();return b}}}return null};Function._validateParameterType=function(b,c,k,j,h,d){var a;if(typeof b==="undefined")if(h)return null;else{a=Error.argumentUndefined(d);a.popStackFrame();return a}if(b===null)if(h)return null;else{a=Error.argumentNull(d);a.popStackFrame();return a}if(c&&c.__enum){if(typeof b!=="number"){a=Error.argumentType(d,Object.getType(b),c);a.popStackFrame();return a}if(b%1===0){var e=c.prototype;if(!c.__flags||b===0){for(var g in e)if(e[g]===b)return null}else{var i=b;for(var g in e){var f=e[g];if(f===0)continue;if((f&b)===f)i-=f;if(i===0)return null}}}a=Error.argumentOutOfRange(d,b,String.format(Sys.Res.enumInvalidValue,b,c.getName()));a.popStackFrame();return a}if(j&&b!==window&&b!==document&&!(window.HTMLElement&&b instanceof HTMLElement)&&typeof b.nodeName!=="string"){a=Error.argument(d,Sys.Res.argumentDomElement);a.popStackFrame();return a}if(c&&!c.isInstanceOfType(b)){a=Error.argumentType(d,Object.getType(b),c);a.popStackFrame();return a}if(c===Number&&k)if(b%1!==0){a=Error.argumentOutOfRange(d,b,Sys.Res.argumentInteger);a.popStackFrame();return a}return null};Error.__TypeName="Error";Error.__class=true;Error.create=function(d,b){var a=new Error(d);a.message=d;if(b)for(var c in b)a[c]=b[c];a.popStackFrame();return a};Error.argument=function(a,c){var b="Sys.ArgumentException: "+(c?c:Sys.Res.argument);if(a)b+="\n"+String.format(Sys.Res.paramName,a);var d=Error.create(b,{name:"Sys.ArgumentException",paramName:a});d.popStackFrame();return d};Error.argumentNull=function(a,c){var b="Sys.ArgumentNullException: "+(c?c:Sys.Res.argumentNull);if(a)b+="\n"+String.format(Sys.Res.paramName,a);var d=Error.create(b,{name:"Sys.ArgumentNullException",paramName:a});d.popStackFrame();return d};Error.argumentOutOfRange=function(c,a,d){var b="Sys.ArgumentOutOfRangeException: "+(d?d:Sys.Res.argumentOutOfRange);if(c)b+="\n"+String.format(Sys.Res.paramName,c);if(typeof a!=="undefined"&&a!==null)b+="\n"+String.format(Sys.Res.actualValue,a);var e=Error.create(b,{name:"Sys.ArgumentOutOfRangeException",paramName:c,actualValue:a});e.popStackFrame();return e};Error.argumentType=function(d,c,b,e){var a="Sys.ArgumentTypeException: ";if(e)a+=e;else if(c&&b)a+=String.format(Sys.Res.argumentTypeWithTypes,c.getName(),b.getName());else a+=Sys.Res.argumentType;if(d)a+="\n"+String.format(Sys.Res.paramName,d);var f=Error.create(a,{name:"Sys.ArgumentTypeException",paramName:d,actualType:c,expectedType:b});f.popStackFrame();return f};Error.argumentUndefined=function(a,c){var b="Sys.ArgumentUndefinedException: "+(c?c:Sys.Res.argumentUndefined);if(a)b+="\n"+String.format(Sys.Res.paramName,a);var d=Error.create(b,{name:"Sys.ArgumentUndefinedException",paramName:a});d.popStackFrame();return d};Error.format=function(a){var c="Sys.FormatException: "+(a?a:Sys.Res.format),b=Error.create(c,{name:"Sys.FormatException"});b.popStackFrame();return b};Error.invalidOperation=function(a){var c="Sys.InvalidOperationException: "+(a?a:Sys.Res.invalidOperation),b=Error.create(c,{name:"Sys.InvalidOperationException"});b.popStackFrame();return b};Error.notImplemented=function(a){var c="Sys.NotImplementedException: "+(a?a:Sys.Res.notImplemented),b=Error.create(c,{name:"Sys.NotImplementedException"});b.popStackFrame();return b};Error.parameterCount=function(a){var c="Sys.ParameterCountException: "+(a?a:Sys.Res.parameterCount),b=Error.create(c,{name:"Sys.ParameterCountException"});b.popStackFrame();return b};Error.prototype.popStackFrame=function(){if(typeof this.stack==="undefined"||this.stack===null||typeof this.fileName==="undefined"||this.fileName===null||typeof this.lineNumber==="undefined"||this.lineNumber===null)return;var a=this.stack.split("\n"),c=a[0],e=this.fileName+":"+this.lineNumber;while(typeof c!=="undefined"&&c!==null&&c.indexOf(e)===-1){a.shift();c=a[0]}var d=a[1];if(typeof d==="undefined"||d===null)return;var b=d.match(/@(.*):(\d+)$/);if(typeof b==="undefined"||b===null)return;this.fileName=b[1];this.lineNumber=parseInt(b[2]);a.shift();this.stack=a.join("\n")};if(!window)this.window=this;window.Type=Function;window.__rootNamespaces=[];window.__registeredTypes={};Type.prototype.callBaseMethod=function(a,d,b){var c=this.getBaseMethod(a,d);if(!b)return c.apply(a);else return c.apply(a,b)};Type.prototype.getBaseMethod=function(d,c){var b=this.getBaseType();if(b){var a=b.prototype[c];return a instanceof Function?a:null}return null};Type.prototype.getBaseType=function(){return typeof this.__baseType==="undefined"?null:this.__baseType};Type.prototype.getInterfaces=function(){var a=[],b=this;while(b){var c=b.__interfaces;if(c)for(var d=0,f=c.length;d<f;d++){var e=c[d];if(!Array.contains(a,e))a[a.length]=e}b=b.__baseType}return a};Type.prototype.getName=function(){return typeof this.__TypeName==="undefined"?"":this.__TypeName};Type.prototype.implementsInterface=function(d){this.resolveInheritance();var c=d.getName(),a=this.__interfaceCache;if(a){var e=a[c];if(typeof e!=="undefined")return e}else a=this.__interfaceCache={};var b=this;while(b){var f=b.__interfaces;if(f)if(Array.indexOf(f,d)!==-1)return a[c]=true;b=b.__baseType}return a[c]=false};Type.prototype.inheritsFrom=function(b){this.resolveInheritance();var a=this.__baseType;while(a){if(a===b)return true;a=a.__baseType}return false};Type.prototype.initializeBase=function(a,b){this.resolveInheritance();if(this.__baseType)if(!b)this.__baseType.apply(a);else this.__baseType.apply(a,b);return a};Type.prototype.isImplementedBy=function(a){if(typeof a==="undefined"||a===null)return false;var b=Object.getType(a);return!!(b.implementsInterface&&b.implementsInterface(this))};Type.prototype.isInstanceOfType=function(b){if(typeof b==="undefined"||b===null)return false;if(b instanceof this)return true;var a=Object.getType(b);return!!(a===this)||a.inheritsFrom&&a.inheritsFrom(this)||a.implementsInterface&&a.implementsInterface(this)};Type.prototype.registerClass=function(c,b,d){this.prototype.constructor=this;this.__TypeName=c;this.__class=true;if(b){this.__baseType=b;this.__basePrototypePending=true}if(!window.__classes)window.__classes={};window.__classes[c.toUpperCase()]=this;if(d){this.__interfaces=[];for(var a=2;a<arguments.length;a++){var e=arguments[a];this.__interfaces.push(e)}}return this};Type.prototype.registerInterface=function(a){this.prototype.constructor=this;this.__TypeName=a;this.__interface=true;return this};Type.prototype.resolveInheritance=function(){if(this.__basePrototypePending){var b=this.__baseType;b.resolveInheritance();for(var a in b.prototype){var c=b.prototype[a];if(!this.prototype[a])this.prototype[a]=c}delete this.__basePrototypePending}};Type.getRootNamespaces=function(){return Array.clone(window.__rootNamespaces)};Type.isClass=function(a){if(typeof a==="undefined"||a===null)return false;return!!a.__class};Type.isInterface=function(a){if(typeof a==="undefined"||a===null)return false;return!!a.__interface};Type.isNamespace=function(a){if(typeof a==="undefined"||a===null)return false;return!!a.__namespace};Type.parse=function(typeName,ns){var fn;if(ns){if(!window.__classes)return null;fn=window.__classes[ns.getName().toUpperCase()+"."+typeName.toUpperCase()];return fn||null}if(!typeName)return null;if(!Type.__htClasses)Type.__htClasses={};fn=Type.__htClasses[typeName];if(!fn){fn=eval(typeName);Type.__htClasses[typeName]=fn}return fn};Type.registerNamespace=function(f){var d=window,c=f.split(".");for(var b=0;b<c.length;b++){var e=c[b],a=d[e];if(!a){a=d[e]={};if(b===0)window.__rootNamespaces[window.__rootNamespaces.length]=a;a.__namespace=true;a.__TypeName=c.slice(0,b+1).join(".");a.getName=function(){return this.__TypeName}}d=a}};Object.__TypeName="Object";Object.__class=true;Object.getType=function(b){var a=b.constructor;if(!a||typeof a!=="function"||!a.__TypeName||a.__TypeName==="Object")return Object;return a};Object.getTypeName=function(a){return Object.getType(a).getName()};Boolean.__TypeName="Boolean";Boolean.__class=true;Boolean.parse=function(b){var a=b.trim().toLowerCase();if(a==="false")return false;if(a==="true")return true};Date.__TypeName="Date";Date.__class=true;Date._appendPreOrPostMatch=function(e,b){var d=0,a=false;for(var c=0,g=e.length;c<g;c++){var f=e.charAt(c);switch(f){case"'":if(a)b.append("'");else d++;a=false;break;case"\\":if(a)b.append("\\");a=!a;break;default:b.append(f);a=false;break}}return d};Date._expandFormat=function(a,b){if(!b)b="F";if(b.length===1)switch(b){case"d":return a.ShortDatePattern;case"D":return a.LongDatePattern;case"t":return a.ShortTimePattern;case"T":return a.LongTimePattern;case"F":return a.FullDateTimePattern;case"M":case"m":return a.MonthDayPattern;case"s":return a.SortableDateTimePattern;case"Y":case"y":return a.YearMonthPattern;default:throw Error.format(Sys.Res.formatInvalidString)}return b};Date._expandYear=function(c,a){if(a<100){var b=(new Date).getFullYear();a+=b-b%100;if(a>c.Calendar.TwoDigitYearMax)return a-100}return a};Date._getParseRegExp=function(b,e){if(!b._parseRegExp)b._parseRegExp={};else if(b._parseRegExp[e])return b._parseRegExp[e];var c=Date._expandFormat(b,e);c=c.replace(/([\^\$\.\*\+\?\|\[\]\(\)\{\}])/g,"\\\\$1");var a=new Sys.StringBuilder("^"),j=[],f=0,i=0,h=Date._getTokenRegExp(),d;while((d=h.exec(c))!==null){var l=c.slice(f,d.index);f=h.lastIndex;i+=Date._appendPreOrPostMatch(l,a);if(i%2===1){a.append(d[0]);continue}switch(d[0]){case"dddd":case"ddd":case"MMMM":case"MMM":a.append("(\\D+)");break;case"tt":case"t":a.append("(\\D*)");break;case"yyyy":a.append("(\\d{4})");break;case"fff":a.append("(\\d{3})");break;case"ff":a.append("(\\d{2})");break;case"f":a.append("(\\d)");break;case"dd":case"d":case"MM":case"M":case"yy":case"y":case"HH":case"H":case"hh":case"h":case"mm":case"m":case"ss":case"s":a.append("(\\d\\d?)");break;case"zzz":a.append("([+-]?\\d\\d?:\\d{2})");break;case"zz":case"z":a.append("([+-]?\\d\\d?)");break}Array.add(j,d[0])}Date._appendPreOrPostMatch(c.slice(f),a);a.append("$");var k=a.toString().replace(/\s+/g,"\\s+"),g={"regExp":k,"groups":j};b._parseRegExp[e]=g;return g};Date._getTokenRegExp=function(){return/dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zzz|zz|z/g};Date.parseLocale=function(a){return Date._parse(a,Sys.CultureInfo.CurrentCulture,arguments)};Date.parseInvariant=function(a){return Date._parse(a,Sys.CultureInfo.InvariantCulture,arguments)};Date._parse=function(g,c,h){var e=false;for(var a=1,i=h.length;a<i;a++){var f=h[a];if(f){e=true;var b=Date._parseExact(g,f,c);if(b)return b}}if(!e){var d=c._getDateTimeFormats();for(var a=0,i=d.length;a<i;a++){var b=Date._parseExact(g,d[a],c);if(b)return b}}return null};Date._parseExact=function(s,y,j){s=s.trim();var m=j.dateTimeFormat,v=Date._getParseRegExp(m,y),x=(new RegExp(v.regExp)).exec(s);if(x!==null){var w=v.groups,f=null,c=null,h=null,g=null,d=0,n=0,o=0,e=0,k=null,r=false;for(var p=0,z=w.length;p<z;p++){var a=x[p+1];if(a)switch(w[p]){case"dd":case"d":h=Date._parseInt(a);if(h<1||h>31)return null;break;case"MMMM":c=j._getMonthIndex(a);if(c<0||c>11)return null;break;case"MMM":c=j._getAbbrMonthIndex(a);if(c<0||c>11)return null;break;case"M":case"MM":var c=Date._parseInt(a)-1;if(c<0||c>11)return null;break;case"y":case"yy":f=Date._expandYear(m,Date._parseInt(a));if(f<0||f>9999)return null;break;case"yyyy":f=Date._parseInt(a);if(f<0||f>9999)return null;break;case"h":case"hh":d=Date._parseInt(a);if(d===12)d=0;if(d<0||d>11)return null;break;case"H":case"HH":d=Date._parseInt(a);if(d<0||d>23)return null;break;case"m":case"mm":n=Date._parseInt(a);if(n<0||n>59)return null;break;case"s":case"ss":o=Date._parseInt(a);if(o<0||o>59)return null;break;case"tt":case"t":var u=a.toUpperCase();r=u===m.PMDesignator.toUpperCase();if(!r&&u!==m.AMDesignator.toUpperCase())return null;break;case"f":e=Date._parseInt(a)*100;if(e<0||e>999)return null;break;case"ff":e=Date._parseInt(a)*10;if(e<0||e>999)return null;break;case"fff":e=Date._parseInt(a);if(e<0||e>999)return null;break;case"dddd":g=j._getDayIndex(a);if(g<0||g>6)return null;break;case"ddd":g=j._getAbbrDayIndex(a);if(g<0||g>6)return null;break;case"zzz":var q=a.split(/:/);if(q.length!==2)return null;var i=Date._parseInt(q[0]);if(i<-12||i>13)return null;var l=Date._parseInt(q[1]);if(l<0||l>59)return null;k=i*60+(a.startsWith("-")?-l:l);break;case"z":case"zz":var i=Date._parseInt(a);if(i<-12||i>13)return null;k=i*60;break}}var b=new Date;if(f===null)f=b.getFullYear();if(c===null)c=b.getMonth();if(h===null)h=b.getDate();b.setFullYear(f,c,h);if(b.getDate()!==h)return null;if(g!==null&&b.getDay()!==g)return null;if(r&&d<12)d+=12;b.setHours(d,n,o,e);if(k!==null){var t=b.getMinutes()-(k+b.getTimezoneOffset());b.setHours(b.getHours()+parseInt(t/60),t%60)}return b}};Date._parseInt=function(a){return parseInt(a.replace(/^[\s0]+(\d+)$/,"$1"))};Date.prototype.format=function(a){return this._toFormattedString(a,Sys.CultureInfo.InvariantCulture)};Date.prototype.localeFormat=function(a){return this._toFormattedString(a,Sys.CultureInfo.CurrentCulture)};Date.prototype._toFormattedString=function(e,h){if(!e||e.length===0||e==="i")if(h&&h.name.length>0)return this.toLocaleString();else return this.toString();var d=h.dateTimeFormat;e=Date._expandFormat(d,e);var a=new Sys.StringBuilder,b;function c(a){if(a<10)return"0"+a;return a.toString()}function g(a){if(a<10)return"00"+a;if(a<100)return"0"+a;return a.toString()}var j=0,i=Date._getTokenRegExp();for(;true;){var l=i.lastIndex,f=i.exec(e),k=e.slice(l,f?f.index:e.length);j+=Date._appendPreOrPostMatch(k,a);if(!f)break;if(j%2===1){a.append(f[0]);continue}switch(f[0]){case"dddd":a.append(d.DayNames[this.getDay()]);break;case"ddd":a.append(d.AbbreviatedDayNames[this.getDay()]);break;case"dd":a.append(c(this.getDate()));break;case"d":a.append(this.getDate());break;case"MMMM":a.append(d.MonthNames[this.getMonth()]);break;case"MMM":a.append(d.AbbreviatedMonthNames[this.getMonth()]);break;case"MM":a.append(c(this.getMonth()+1));break;case"M":a.append(this.getMonth()+1);break;case"yyyy":a.append(this.getFullYear());break;case"yy":a.append(c(this.getFullYear()%100));break;case"y":a.append(this.getFullYear()%100);break;case"hh":b=this.getHours()%12;if(b===0)b=12;a.append(c(b));break;case"h":b=this.getHours()%12;if(b===0)b=12;a.append(b);break;case"HH":a.append(c(this.getHours()));break;case"H":a.append(this.getHours());break;case"mm":a.append(c(this.getMinutes()));break;case"m":a.append(this.getMinutes());break;case"ss":a.append(c(this.getSeconds()));break;case"s":a.append(this.getSeconds());break;case"tt":a.append(this.getHours()<12?d.AMDesignator:d.PMDesignator);break;case"t":a.append((this.getHours()<12?d.AMDesignator:d.PMDesignator).charAt(0));break;case"f":a.append(g(this.getMilliseconds()).charAt(0));break;case"ff":a.append(g(this.getMilliseconds()).substr(0,2));break;case"fff":a.append(g(this.getMilliseconds()));break;case"z":b=this.getTimezoneOffset()/60;a.append((b>=0?"+":"-")+Math.floor(Math.abs(b)));break;case"zz":b=this.getTimezoneOffset()/60;a.append((b>=0?"+":"-")+c(Math.floor(Math.abs(b))));break;case"zzz":b=this.getTimezoneOffset()/60;a.append((b>=0?"+":"-")+c(Math.floor(Math.abs(b)))+d.TimeSeparator+c(Math.abs(this.getTimezoneOffset()%60)));break}}return a.toString()};Number.__TypeName="Number";Number.__class=true;Number.parseLocale=function(a){return Number._parse(a,Sys.CultureInfo.CurrentCulture)};Number.parseInvariant=function(a){return Number._parse(a,Sys.CultureInfo.InvariantCulture)};Number._parse=function(g,f){var a=g.trim();if(a.match(/infinity/i)!==null)return parseFloat(a);if(a.match(/^0x[a-f0-9]+$/i)!==null)return parseInt(a);var d=f.numberFormat,b=d.NumberDecimalSeparator,c=d.NumberGroupSeparator,e=new RegExp("^[+-]?[\\d\\"+c+"]*\\"+b+"?\\d*([eE][+-]?\\d+)?$");if(!a.match(e))return Number.NaN;a=a.split(c).join("");a=a.replace(b,".");return parseFloat(a)};Number.prototype.format=function(a){return this._toFormattedString(a,Sys.CultureInfo.InvariantCulture)};Number.prototype.localeFormat=function(a){return this._toFormattedString(a,Sys.CultureInfo.CurrentCulture)};Number.prototype._toFormattedString=function(d,j){if(!d||d.length===0||d==="i")if(j&&j.name.length>0)return this.toLocaleString();else return this.toString();var q=["n %","n%","%n"],p=["-n %","-n%","-%n"],r=["(n)","-n","- n","n-","n -"],o=["$n","n$","$ n","n $"],n=["($n)","-$n","$-n","$n-","(n$)","-n$","n-$","n$-","-n $","-$ n","n $-","$ n-","$ -n","n- $","($ n)","(n $)"];function i(p,k,j,l,o){var e=j[0],g=1,c=p.toString(),a="",m="",i=c.split(".");if(i.length>1){c=i[0];a=i[1];var h=a.split(/e/i);if(h.length>1){a=h[0];m="e"+h[1]}}if(k>0){var f=a.length-k;if(f>0)a=a.slice(0,k);else if(f<0)for(var n=0;n<Math.abs(f);n++)a+="0";a=o+a}else a="";a+=m;var b=c.length-1,d="";while(b>=0){if(e===0||e>b)if(d.length>0)return c.slice(0,b+1)+l+d+a;else return c.slice(0,b+1)+a;if(d.length>0)d=c.slice(b-e+1,b+1)+l+d;else d=c.slice(b-e+1,b+1);b-=e;if(g<j.length){e=j[g];g++}}return c.slice(0,b+1)+l+d+a}var a=j.numberFormat,e=Math.abs(this);if(!d)d="D";var b=-1;if(d.length>1)b=parseInt(d.slice(1));var c;switch(d.charAt(0)){case"d":case"D":c="n";if(b!==-1){var g=""+e,k=b-g.length;if(k>0)for(var m=0;m<k;m++)g="0"+g;e=g}if(this<0)e=-e;break;case"c":case"C":if(this<0)c=n[a.CurrencyNegativePattern];else c=o[a.CurrencyPositivePattern];if(b===-1)b=a.CurrencyDecimalDigits;e=i(Math.abs(this),b,a.CurrencyGroupSizes,a.CurrencyGroupSeparator,a.CurrencyDecimalSeparator);break;case"n":case"N":if(this<0)c=r[a.NumberNegativePattern];else c="n";if(b===-1)b=a.NumberDecimalDigits;e=i(Math.abs(this),b,a.NumberGroupSizes,a.NumberGroupSeparator,a.NumberDecimalSeparator);break;case"p":case"P":if(this<0)c=p[a.PercentNegativePattern];else c=q[a.PercentPositivePattern];if(b===-1)b=a.PercentDecimalDigits;e=i(Math.abs(this),b,a.PercentGroupSizes,a.PercentGroupSeparator,a.PercentDecimalSeparator);break;default:throw Error.format(Sys.Res.formatBadFormatSpecifier)}var l=/n|\$|-|%/g,f="";for(;true;){var s=l.lastIndex,h=l.exec(c);f+=c.slice(s,h?h.index:c.length);if(!h)break;switch(h[0]){case"n":f+=e;break;case"$":f+=a.CurrencySymbol;break;case"-":f+=a.NegativeSign;break;case"%":f+=a.PercentSymbol;break}}return f};RegExp.__TypeName="RegExp";RegExp.__class=true;Array.__TypeName="Array";Array.__class=true;Array.add=Array.enqueue=function(a,b){a[a.length]=b};Array.addRange=function(a,b){a.push.apply(a,b)};Array.clear=function(a){a.length=0};Array.clone=function(a){if(a.length===1)return[a[0]];else return Array.apply(null,a)};Array.contains=function(a,b){return Array.indexOf(a,b)>=0};Array.dequeue=function(a){return a.shift()};Array.forEach=function(b,e,d){for(var a=0,f=b.length;a<f;a++){var c=b[a];if(typeof c!=="undefined")e.call(d,c,a,b)}};Array.indexOf=function(d,e,a){if(typeof e==="undefined")return-1;var c=d.length;if(c!==0){a=a-0;if(isNaN(a))a=0;else{if(isFinite(a))a=a-a%1;if(a<0)a=Math.max(0,c+a)}for(var b=a;b<c;b++)if(typeof d[b]!=="undefined"&&d[b]===e)return b}return-1};Array.insert=function(a,b,c){a.splice(b,0,c)};Array.parse=function(value){if(!value)return[];return eval(value)};Array.remove=function(b,c){var a=Array.indexOf(b,c);if(a>=0)b.splice(a,1);return a>=0};Array.removeAt=function(a,b){a.splice(b,1)};String.__TypeName="String";String.__class=true;String.prototype.endsWith=function(a){return this.substr(this.length-a.length)===a};String.prototype.startsWith=function(a){return this.substr(0,a.length)===a};String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")};String.prototype.trimEnd=function(){return this.replace(/\s+$/,"")};String.prototype.trimStart=function(){return this.replace(/^\s+/,"")};String.format=function(){return String._toFormattedString(false,arguments)};String.localeFormat=function(){return String._toFormattedString(true,arguments)};String._toFormattedString=function(l,j){var c="",e=j[0];for(var a=0;true;){var f=e.indexOf("{",a),d=e.indexOf("}",a);if(f<0&&d<0){c+=e.slice(a);break}if(d>0&&(d<f||f<0)){c+=e.slice(a,d+1);a=d+2;continue}c+=e.slice(a,f);a=f+1;if(e.charAt(a)==="{"){c+="{";a++;continue}if(d<0)break;var h=e.substring(a,d),g=h.indexOf(":"),k=parseInt(g<0?h:h.substring(0,g))+1,i=g<0?"":h.substring(g+1),b=j[k];if(typeof b==="undefined"||b===null)b="";if(b.toFormattedString)c+=b.toFormattedString(i);else if(l&&b.localeFormat)c+=b.localeFormat(i);else if(b.format)c+=b.format(i);else c+=b.toString();a=d+1}return c};Type.registerNamespace("Sys");Sys.IDisposable=function(){};Sys.IDisposable.prototype={};Sys.IDisposable.registerInterface("Sys.IDisposable");Sys.StringBuilder=function(a){this._parts=typeof a!=="undefined"&&a!==null&&a!==""?[a.toString()]:[];this._value={};this._len=0};Sys.StringBuilder.prototype={append:function(a){this._parts[this._parts.length]=a},appendLine:function(a){this._parts[this._parts.length]=typeof a==="undefined"||a===null||a===""?"\r\n":a+"\r\n"},clear:function(){this._parts=[];this._value={};this._len=0},isEmpty:function(){if(this._parts.length===0)return true;return this.toString()===""},toString:function(a){a=a||"";var b=this._parts;if(this._len!==b.length){this._value={};this._len=b.length}var d=this._value;if(typeof d[a]==="undefined"){if(a!=="")for(var c=0;c<b.length;)if(typeof b[c]==="undefined"||b[c]===""||b[c]===null)b.splice(c,1);else c++;d[a]=this._parts.join(a)}return d[a]}};Sys.StringBuilder.registerClass("Sys.StringBuilder");if(!window.XMLHttpRequest)window.XMLHttpRequest=function(){var b=["Msxml2.XMLHTTP","Microsoft.XMLHTTP"];for(var a=0;a<b.length;a++)try{var c=new ActiveXObject(b[a]);return c}catch(d){}return null};Sys.Browser={};Sys.Browser.InternetExplorer={};Sys.Browser.Firefox={};Sys.Browser.Safari={};Sys.Browser.Opera={};Sys.Browser.agent=null;Sys.Browser.hasDebuggerStatement=false;Sys.Browser.name=navigator.appName;Sys.Browser.version=parseFloat(navigator.appVersion);if(navigator.userAgent.indexOf(" MSIE ")>-1){Sys.Browser.agent=Sys.Browser.InternetExplorer;Sys.Browser.version=parseFloat(navigator.userAgent.match(/MSIE (\d+\.\d+)/)[1]);Sys.Browser.hasDebuggerStatement=true}else if(navigator.userAgent.indexOf(" Firefox/")>-1){Sys.Browser.agent=Sys.Browser.Firefox;Sys.Browser.version=parseFloat(navigator.userAgent.match(/Firefox\/(\d+\.\d+)/)[1]);Sys.Browser.name="Firefox";Sys.Browser.hasDebuggerStatement=true}else if(navigator.userAgent.indexOf(" Safari/")>-1){Sys.Browser.agent=Sys.Browser.Safari;Sys.Browser.version=parseFloat(navigator.userAgent.match(/Safari\/(\d+\.\d+)/)[1]);Sys.Browser.name="Safari"}else if(navigator.userAgent.indexOf("Opera/")>-1)Sys.Browser.agent=Sys.Browser.Opera;Type.registerNamespace("Sys.UI");Sys._Debug=function(){};Sys._Debug.prototype={_appendConsole:function(a){if(typeof Debug!=="undefined"&&Debug.writeln)Debug.writeln(a);if(window.console&&window.console.log)window.console.log(a);if(window.opera)window.opera.postError(a);if(window.debugService)window.debugService.trace(a)},_appendTrace:function(b){var a=document.getElementById("TraceConsole");if(a&&a.tagName.toUpperCase()==="TEXTAREA")a.value+=b+"\n"},assert:function(c,a,b){if(!c){a=b&&this.assert.caller?String.format(Sys.Res.assertFailedCaller,a,this.assert.caller):String.format(Sys.Res.assertFailed,a);if(confirm(String.format(Sys.Res.breakIntoDebugger,a)))this.fail(a)}},clearTrace:function(){var a=document.getElementById("TraceConsole");if(a&&a.tagName.toUpperCase()==="TEXTAREA")a.value=""},fail:function(message){this._appendConsole(message);if(Sys.Browser.hasDebuggerStatement)eval("debugger")},trace:function(a){this._appendConsole(a);this._appendTrace(a)},traceDump:function(a,b){var c=this._traceDump(a,b,true)},_traceDump:function(a,c,f,b,d){c=c?c:"traceDump";b=b?b:"";if(a===null){this.trace(b+c+": null");return}switch(typeof a){case"undefined":this.trace(b+c+": Undefined");break;case"number":case"string":case"boolean":this.trace(b+c+": "+a);break;default:if(Date.isInstanceOfType(a)||RegExp.isInstanceOfType(a)){this.trace(b+c+": "+a.toString());break}if(!d)d=[];else if(Array.contains(d,a)){this.trace(b+c+": ...");return}Array.add(d,a);if(a==window||a===document||window.HTMLElement&&a instanceof HTMLElement||typeof a.nodeName==="string"){var k=a.tagName?a.tagName:"DomElement";if(a.id)k+=" - "+a.id;this.trace(b+c+" {"+k+"}")}else{var i=Object.getTypeName(a);this.trace(b+c+(typeof i==="string"?" {"+i+"}":""));if(b===""||f){b+="    ";var e,j,l,g,h;if(Array.isInstanceOfType(a)){j=a.length;for(e=0;e<j;e++)this._traceDump(a[e],"["+e+"]",f,b,d)}else for(g in a){h=a[g];if(!Function.isInstanceOfType(h))this._traceDump(h,g,f,b,d)}}}Array.remove(d,a)}}};Sys._Debug.registerClass("Sys._Debug");Sys.Debug=new Sys._Debug;Sys.Debug.isDebug=false;function Sys$Enum$parse(c,e){var a,b,i;if(e){a=this.__lowerCaseValues;if(!a){this.__lowerCaseValues=a={};var g=this.prototype;for(var f in g)a[f.toLowerCase()]=g[f]}}else a=this.prototype;if(!this.__flags){i=e?c.toLowerCase():c;b=a[i.trim()];if(typeof b!=="number")throw Error.argument("value",String.format(Sys.Res.enumInvalidValue,c,this.__TypeName));return b}else{var h=(e?c.toLowerCase():c).split(","),j=0;for(var d=h.length-1;d>=0;d--){var k=h[d].trim();b=a[k];if(typeof b!=="number")throw Error.argument("value",String.format(Sys.Res.enumInvalidValue,c.split(",")[d].trim(),this.__TypeName));j|=b}return j}}function Sys$Enum$toString(c){if(typeof c==="undefined"||c===null)return this.__string;var d=this.prototype,a;if(!this.__flags||c===0){for(a in d)if(d[a]===c)return a}else{var b=this.__sortedValues;if(!b){b=[];for(a in d)b[b.length]={key:a,value:d[a]};b.sort(function(a,b){return a.value-b.value});this.__sortedValues=b}var e=[],g=c;for(a=b.length-1;a>=0;a--){var h=b[a],f=h.value;if(f===0)continue;if((f&c)===f){e[e.length]=h.key;g-=f;if(g===0)break}}if(e.length&&g===0)return e.reverse().join(", ")}return""}Type.prototype.registerEnum=function(c,b){for(var a in this.prototype)this[a]=this.prototype[a];this.__TypeName=c;this.parse=Sys$Enum$parse;this.__string=this.toString();this.toString=Sys$Enum$toString;this.__flags=b;this.__enum=true};Type.isEnum=function(a){if(typeof a==="undefined"||a===null)return false;return!!a.__enum};Type.isFlags=function(a){if(typeof a==="undefined"||a===null)return false;return!!a.__flags};Sys.EventHandlerList=function(){this._list={}};Sys.EventHandlerList.prototype={addHandler:function(b,a){Array.add(this._getEvent(b,true),a)},removeHandler:function(c,b){var a=this._getEvent(c);if(!a)return;Array.remove(a,b)},getHandler:function(b){var a=this._getEvent(b);if(!a||a.length===0)return null;a=Array.clone(a);if(!a._handler)a._handler=function(c,d){for(var b=0,e=a.length;b<e;b++)a[b](c,d)};return a._handler},_getEvent:function(a,b){if(!this._list[a]){if(!b)return null;this._list[a]=[]}return this._list[a]}};Sys.EventHandlerList.registerClass("Sys.EventHandlerList");Sys.EventArgs=function(){};Sys.EventArgs.registerClass("Sys.EventArgs");Sys.EventArgs.Empty=new Sys.EventArgs;Sys.CancelEventArgs=function(){Sys.CancelEventArgs.initializeBase(this);this._cancel=false};Sys.CancelEventArgs.prototype={get_cancel:function(){return this._cancel},set_cancel:function(a){this._cancel=a}};Sys.CancelEventArgs.registerClass("Sys.CancelEventArgs",Sys.EventArgs);Sys.INotifyPropertyChange=function(){};Sys.INotifyPropertyChange.prototype={};Sys.INotifyPropertyChange.registerInterface("Sys.INotifyPropertyChange");Sys.PropertyChangedEventArgs=function(a){Sys.PropertyChangedEventArgs.initializeBase(this);this._propertyName=a};Sys.PropertyChangedEventArgs.prototype={get_propertyName:function(){return this._propertyName}};Sys.PropertyChangedEventArgs.registerClass("Sys.PropertyChangedEventArgs",Sys.EventArgs);Sys.INotifyDisposing=function(){};Sys.INotifyDisposing.prototype={};Sys.INotifyDisposing.registerInterface("Sys.INotifyDisposing");Sys.Component=function(){if(Sys.Application)Sys.Application.registerDisposableObject(this)};Sys.Component.prototype={_id:null,_initialized:false,_updating:false,get_events:function(){if(!this._events)this._events=new Sys.EventHandlerList;return this._events},get_id:function(){return this._id},set_id:function(a){this._id=a},get_isInitialized:function(){return this._initialized},get_isUpdating:function(){return this._updating},add_disposing:function(a){this.get_events().addHandler("disposing",a)},remove_disposing:function(a){this.get_events().removeHandler("disposing",a)},add_propertyChanged:function(a){this.get_events().addHandler("propertyChanged",a)},remove_propertyChanged:function(a){this.get_events().removeHandler("propertyChanged",a)},beginUpdate:function(){this._updating=true},dispose:function(){if(this._events){var a=this._events.getHandler("disposing");if(a)a(this,Sys.EventArgs.Empty)}delete this._events;Sys.Application.unregisterDisposableObject(this);Sys.Application.removeComponent(this)},endUpdate:function(){this._updating=false;if(!this._initialized)this.initialize();this.updated()},initialize:function(){this._initialized=true},raisePropertyChanged:function(b){if(!this._events)return;var a=this._events.getHandler("propertyChanged");if(a)a(this,new Sys.PropertyChangedEventArgs(b))},updated:function(){}};Sys.Component.registerClass("Sys.Component",null,Sys.IDisposable,Sys.INotifyPropertyChange,Sys.INotifyDisposing);function Sys$Component$_setProperties(a,i){var d,j=Object.getType(a),e=j===Object||j===Sys.UI.DomElement,h=Sys.Component.isInstanceOfType(a)&&!a.get_isUpdating();if(h)a.beginUpdate();for(var c in i){var b=i[c],f=e?null:a["get_"+c];if(e||typeof f!=="function"){var k=a[c];if(!b||typeof b!=="object"||e&&!k)a[c]=b;else Sys$Component$_setProperties(k,b)}else{var l=a["set_"+c];if(typeof l==="function")l.apply(a,[b]);else if(b instanceof Array){d=f.apply(a);for(var g=0,m=d.length,n=b.length;g<n;g++,m++)d[m]=b[g]}else if(typeof b==="object"&&Object.getType(b)===Object){d=f.apply(a);Sys$Component$_setProperties(d,b)}}}if(h)a.endUpdate()}function Sys$Component$_setReferences(c,b){for(var a in b){var e=c["set_"+a],d=$find(b[a]);e.apply(c,[d])}}var $create=Sys.Component.create=function(h,f,d,c,g){var a=g?new h(g):new h,b=Sys.Application,i=b.get_isCreatingComponents();a.beginUpdate();if(f)Sys$Component$_setProperties(a,f);if(d)for(var e in d)a["add_"+e](d[e]);b._createdComponents[b._createdComponents.length]=a;if(a.get_id())b.addComponent(a);if(i)if(c)b._addComponentToSecondPass(a,c);else a.endUpdate();else{if(c)Sys$Component$_setReferences(a,c);a.endUpdate()}return a};Sys.UI.MouseButton=function(){throw Error.notImplemented()};Sys.UI.MouseButton.prototype={leftButton:0,middleButton:1,rightButton:2};Sys.UI.MouseButton.registerEnum("Sys.UI.MouseButton");Sys.UI.Key=function(){throw Error.notImplemented()};Sys.UI.Key.prototype={backspace:8,tab:9,enter:13,esc:27,space:32,pageUp:33,pageDown:34,end:35,home:36,left:37,up:38,right:39,down:40,del:127};Sys.UI.Key.registerEnum("Sys.UI.Key");Sys.UI.DomEvent=function(c){var a=c;this.rawEvent=a;this.altKey=a.altKey;if(typeof a.button!=="undefined")this.button=typeof a.which!=="undefined"?a.button:a.button===4?Sys.UI.MouseButton.middleButton:a.button===2?Sys.UI.MouseButton.rightButton:Sys.UI.MouseButton.leftButton;if(a.type==="keypress")this.charCode=a.charCode||a.keyCode;else if(a.keyCode&&a.keyCode===46)this.keyCode=127;else this.keyCode=a.keyCode;this.clientX=a.clientX;this.clientY=a.clientY;this.ctrlKey=a.ctrlKey;this.target=a.target?a.target:a.srcElement;if(this.target){var b=Sys.UI.DomElement.getLocation(this.target);this.offsetX=typeof a.offsetX!=="undefined"?a.offsetX:window.pageXOffset+(a.clientX||0)-b.x;this.offsetY=typeof a.offsetY!=="undefined"?a.offsetY:window.pageYOffset+(a.clientY||0)-b.y}this.screenX=a.screenX;this.screenY=a.screenY;this.shiftKey=a.shiftKey;this.type=a.type};Sys.UI.DomEvent.prototype={preventDefault:function(){if(this.rawEvent.preventDefault)this.rawEvent.preventDefault();else if(window.event)window.event.returnValue=false},stopPropagation:function(){if(this.rawEvent.stopPropagation)this.rawEvent.stopPropagation();else if(window.event)window.event.cancelBubble=true}};Sys.UI.DomEvent.registerClass("Sys.UI.DomEvent");var $addHandler=Sys.UI.DomEvent.addHandler=function(a,d,e){if(!a._events)a._events={};var c=a._events[d];if(!c)a._events[d]=c=[];var b;if(a.addEventListener){b=function(b){return e.call(a,new Sys.UI.DomEvent(b))};a.addEventListener(d,b,false)}else if(a.attachEvent){b=function(){return e.call(a,new Sys.UI.DomEvent(window.event))};a.attachEvent("on"+d,b)}c[c.length]={handler:e,browserHandler:b}},$addHandlers=Sys.UI.DomEvent.addHandlers=function(e,d,c){for(var b in d){var a=d[b];if(c)a=Function.createDelegate(c,a);$addHandler(e,b,a)}},$clearHandlers=Sys.UI.DomEvent.clearHandlers=function(a){if(a._events){var e=a._events;for(var b in e){var d=e[b];for(var c=d.length-1;c>=0;c--)$removeHandler(a,b,d[c].handler)}a._events=null}},$removeHandler=Sys.UI.DomEvent.removeHandler=function(a,e,f){var d=null,c=a._events[e],d=null;for(var b=0,g=c.length;b<g;b++)if(c[b].handler===f){d=c[b].browserHandler;break}if(a.removeEventListener)a.removeEventListener(e,d,false);else if(a.detachEvent)a.detachEvent("on"+e,d);c.splice(b,1)};Sys.IContainer=function(){};Sys.IContainer.prototype={};Sys.IContainer.registerInterface("Sys.IContainer");Sys._ScriptLoader=function(){this._scriptsToLoad=null;this._scriptLoadedDelegate=Function.createDelegate(this,this._scriptLoadedHandler)};Sys._ScriptLoader.prototype={dispose:function(){this._stopLoading();if(this._events)delete this._events;this._scriptLoadedDelegate=null},loadScripts:function(a,c,d,b){this._loading=true;this._allScriptsLoadedCallback=c;this._scriptLoadFailedCallback=d;this._scriptLoadTimeoutCallback=b;if(a>0)this._timeoutCookie=window.setTimeout(Function.createDelegate(this,this._scriptLoadTimeoutHandler),a*1000);this._loadScriptsInternal()},notifyScriptLoaded:function(){if(!this._loading)return;this._currentTask._notified++;if(Sys.Browser.agent===Sys.Browser.Safari)if(this._currentTask._notified===1)window.setTimeout(Function.createDelegate(this,function(){this._scriptLoadedHandler(this._currentTask.get_scriptElement(),true)}),0)},queueCustomScriptTag:function(a){if(!this._scriptsToLoad)this._scriptsToLoad=[];Array.add(this._scriptsToLoad,a)},queueScriptBlock:function(a){if(!this._scriptsToLoad)this._scriptsToLoad=[];Array.add(this._scriptsToLoad,{text:a})},queueScriptReference:function(a){if(!this._scriptsToLoad)this._scriptsToLoad=[];Array.add(this._scriptsToLoad,{src:a})},_createScriptElement:function(c){var a=document.createElement("SCRIPT");a.type="text/javascript";for(var b in c)a[b]=c[b];return a},_loadScriptsInternal:function(){if(this._scriptsToLoad&&this._scriptsToLoad.length>0){var b=Array.dequeue(this._scriptsToLoad),a=this._createScriptElement(b);if(a.text&&Sys.Browser.agent===Sys.Browser.Safari){a.innerHTML=a.text;delete a.text}if(typeof b.src==="string"){this._currentTask=new Sys._ScriptLoaderTask(a,this._scriptLoadedDelegate);this._currentTask.execute()}else{document.getElementsByTagName("HEAD")[0].appendChild(a);Sys._ScriptLoader._clearScript(a);this._loadScriptsInternal()}}else{var c=this._allScriptsLoadedCallback;this._stopLoading();if(c)c(this)}},_raiseError:function(a){var c=this._scriptLoadFailedCallback,b=this._currentTask.get_scriptElement();this._stopLoading();if(c)c(this,b,a);else throw Sys._ScriptLoader._errorScriptLoadFailed(b.src,a)},_scriptLoadedHandler:function(a,b){if(b&&this._currentTask._notified)if(this._currentTask._notified>1)this._raiseError(true);else{Array.add(Sys._ScriptLoader._getLoadedScripts(),a.src);this._currentTask.dispose();this._currentTask=null;this._loadScriptsInternal()}else this._raiseError(false)},_scriptLoadTimeoutHandler:function(){var a=this._scriptLoadTimeoutCallback;this._stopLoading();if(a)a(this)},_stopLoading:function(){if(this._timeoutCookie){window.clearTimeout(this._timeoutCookie);this._timeoutCookie=null}if(this._currentTask){this._currentTask.dispose();this._currentTask=null}this._scriptsToLoad=null;this._loading=null;this._allScriptsLoadedCallback=null;this._scriptLoadFailedCallback=null;this._scriptLoadTimeoutCallback=null}};Sys._ScriptLoader.registerClass("Sys._ScriptLoader",null,Sys.IDisposable);Sys._ScriptLoader.getInstance=function(){var a=Sys._ScriptLoader._activeInstance;if(!a)a=Sys._ScriptLoader._activeInstance=new Sys._ScriptLoader;return a};Sys._ScriptLoader.isScriptLoaded=function(b){var a=document.createElement("script");a.src=b;return Array.contains(Sys._ScriptLoader._getLoadedScripts(),a.src)};Sys._ScriptLoader.readLoadedScripts=function(){if(!Sys._ScriptLoader._referencedScripts){var b=Sys._ScriptLoader._referencedScripts=[],c=document.getElementsByTagName("SCRIPT");for(i=c.length-1;i>=0;i--){var d=c[i],a=d.src;if(a.length)if(!Array.contains(b,a))Array.add(b,a)}}};Sys._ScriptLoader._clearScript=function(a){if(!Sys.Debug.isDebug)a.parentNode.removeChild(a)};Sys._ScriptLoader._errorScriptLoadFailed=function(b,d){var a;if(d)a=Sys.Res.scriptLoadMultipleCallbacks;else a=Sys.Res.scriptLoadFailed;var e="Sys.ScriptLoadFailedException: "+String.format(a,b),c=Error.create(e,{name:"Sys.ScriptLoadFailedException","scriptUrl":b});c.popStackFrame();return c};Sys._ScriptLoader._getLoadedScripts=function(){if(!Sys._ScriptLoader._referencedScripts){Sys._ScriptLoader._referencedScripts=[];Sys._ScriptLoader.readLoadedScripts()}return Sys._ScriptLoader._referencedScripts};Sys._ScriptLoaderTask=function(b,a){this._scriptElement=b;this._completedCallback=a;this._notified=0};Sys._ScriptLoaderTask.prototype={get_scriptElement:function(){return this._scriptElement},dispose:function(){if(this._disposed)return;this._disposed=true;this._removeScriptElementHandlers();Sys._ScriptLoader._clearScript(this._scriptElement);this._scriptElement=null},execute:function(){this._addScriptElementHandlers();document.getElementsByTagName("HEAD")[0].appendChild(this._scriptElement)},_addScriptElementHandlers:function(){this._scriptLoadDelegate=Function.createDelegate(this,this._scriptLoadHandler);if(Sys.Browser.agent!==Sys.Browser.InternetExplorer){this._scriptElement.readyState="loaded";$addHandler(this._scriptElement,"load",this._scriptLoadDelegate)}else $addHandler(this._scriptElement,"readystatechange",this._scriptLoadDelegate);this._scriptErrorDelegate=Function.createDelegate(this,this._scriptErrorHandler);$addHandler(this._scriptElement,"error",this._scriptErrorDelegate)},_removeScriptElementHandlers:function(){if(this._scriptLoadDelegate){var a=this.get_scriptElement();if(Sys.Browser.agent!==Sys.Browser.InternetExplorer)$removeHandler(a,"load",this._scriptLoadDelegate);else $removeHandler(a,"readystatechange",this._scriptLoadDelegate);$removeHandler(a,"error",this._scriptErrorDelegate);this._scriptErrorDelegate=null;this._scriptLoadDelegate=null}},_scriptErrorHandler:function(){if(this._disposed)return;this._completedCallback(this.get_scriptElement(),false)},_scriptLoadHandler:function(){if(this._disposed)return;var a=this.get_scriptElement();if(a.readyState!=="loaded"&&a.readyState!=="complete")return;var b=this;window.setTimeout(function(){b._completedCallback(a,true)},0)}};Sys._ScriptLoaderTask.registerClass("Sys._ScriptLoaderTask",null,Sys.IDisposable);Sys.ApplicationLoadEventArgs=function(b,a){Sys.ApplicationLoadEventArgs.initializeBase(this);this._components=b;this._isPartialLoad=a};Sys.ApplicationLoadEventArgs.prototype={get_components:function(){return this._components},get_isPartialLoad:function(){return this._isPartialLoad}};Sys.ApplicationLoadEventArgs.registerClass("Sys.ApplicationLoadEventArgs",Sys.EventArgs);Sys._Application=function(){Sys._Application.initializeBase(this);this._disposableObjects=[];this._components={};this._createdComponents=[];this._secondPassComponents=[];this._unloadHandlerDelegate=Function.createDelegate(this,this._unloadHandler);this._loadHandlerDelegate=Function.createDelegate(this,this._loadHandler);Sys.UI.DomEvent.addHandler(window,"unload",this._unloadHandlerDelegate);Sys.UI.DomEvent.addHandler(window,"load",this._loadHandlerDelegate)};Sys._Application.prototype={_creatingComponents:false,_disposing:false,get_isCreatingComponents:function(){return this._creatingComponents},add_load:function(a){this.get_events().addHandler("load",a)},remove_load:function(a){this.get_events().removeHandler("load",a)},add_init:function(a){if(this._initialized)a(this,Sys.EventArgs.Empty);else this.get_events().addHandler("init",a)},remove_init:function(a){this.get_events().removeHandler("init",a)},add_unload:function(a){this.get_events().addHandler("unload",a)},remove_unload:function(a){this.get_events().removeHandler("unload",a)},addComponent:function(a){this._components[a.get_id()]=a},beginCreateComponents:function(){this._creatingComponents=true},dispose:function(){if(!this._disposing){this._disposing=true;if(window.pageUnload)window.pageUnload(this,Sys.EventArgs.Empty);var c=this.get_events().getHandler("unload");if(c)c(this,Sys.EventArgs.Empty);var b=Array.clone(this._disposableObjects);for(var a=0,e=b.length;a<e;a++)b[a].dispose();Array.clear(this._disposableObjects);Sys.UI.DomEvent.removeHandler(window,"unload",this._unloadHandlerDelegate);if(this._loadHandlerDelegate){Sys.UI.DomEvent.removeHandler(window,"load",this._loadHandlerDelegate);this._loadHandlerDelegate=null}var d=Sys._ScriptLoader.getInstance();if(d)d.dispose();Sys._Application.callBaseMethod(this,"dispose")}},endCreateComponents:function(){var b=this._secondPassComponents;for(var a=0,d=b.length;a<d;a++){var c=b[a].component;Sys$Component$_setReferences(c,b[a].references);c.endUpdate()}this._secondPassComponents=[];this._creatingComponents=false},findComponent:function(b,a){return a?Sys.IContainer.isInstanceOfType(a)?a.findComponent(b):a[b]||null:Sys.Application._components[b]||null},getComponents:function(){var a=[],b=this._components;for(var c in b)a[a.length]=b[c];return a},initialize:function(){if(!this._initialized&&!this._initializing){this._initializing=true;window.setTimeout(Function.createDelegate(this,this._doInitialize),0)}},notifyScriptLoaded:function(){var a=Sys._ScriptLoader.getInstance();if(a)a.notifyScriptLoaded()},registerDisposableObject:function(a){if(!this._disposing)this._disposableObjects[this._disposableObjects.length]=a},raiseLoad:function(){var b=this.get_events().getHandler("load"),a=new Sys.ApplicationLoadEventArgs(Array.clone(this._createdComponents),!this._initializing);if(b)b(this,a);if(window.pageLoad)window.pageLoad(this,a);this._createdComponents=[]},removeComponent:function(b){var a=b.get_id();if(a)delete this._components[a]},unregisterDisposableObject:function(a){if(!this._disposing)Array.remove(this._disposableObjects,a)},_addComponentToSecondPass:function(b,a){this._secondPassComponents[this._secondPassComponents.length]={component:b,references:a}},_doInitialize:function(){Sys._Application.callBaseMethod(this,"initialize");var a=this.get_events().getHandler("init");if(a){this.beginCreateComponents();a(this,Sys.EventArgs.Empty);this.endCreateComponents()}this.raiseLoad();this._initializing=false},_loadHandler:function(){if(this._loadHandlerDelegate){Sys.UI.DomEvent.removeHandler(window,"load",this._loadHandlerDelegate);this._loadHandlerDelegate=null}this.initialize()},_unloadHandler:function(){this.dispose()}};Sys._Application.registerClass("Sys._Application",Sys.Component,Sys.IContainer);Sys.Application=new Sys._Application;var $find=Sys.Application.findComponent;Type.registerNamespace("Sys.Net");Sys.Net.WebRequestExecutor=function(){this._webRequest=null;this._resultObject=null};Sys.Net.WebRequestExecutor.prototype={get_webRequest:function(){return this._webRequest},_set_webRequest:function(a){this._webRequest=a},get_started:function(){throw Error.notImplemented()},get_responseAvailable:function(){throw Error.notImplemented()},get_timedOut:function(){throw Error.notImplemented()},get_aborted:function(){throw Error.notImplemented()},get_responseData:function(){throw Error.notImplemented()},get_statusCode:function(){throw Error.notImplemented()},get_statusText:function(){throw Error.notImplemented()},get_xml:function(){throw Error.notImplemented()},get_object:function(){if(!this._resultObject)this._resultObject=Sys.Serialization.JavaScriptSerializer.deserialize(this.get_responseData());return this._resultObject},executeRequest:function(){throw Error.notImplemented()},abort:function(){throw Error.notImplemented()},getResponseHeader:function(){throw Error.notImplemented()},getAllResponseHeaders:function(){throw Error.notImplemented()}};Sys.Net.WebRequestExecutor.registerClass("Sys.Net.WebRequestExecutor");window.XMLDOM=function(d){if(!window.DOMParser){var c=["Msxml2.DOMDocument.3.0","Msxml2.DOMDocument"];for(var b=0;b<c.length;b++)try{var a=new ActiveXObject(c[b]);a.async=false;a.loadXML(d);a.setProperty("SelectionLanguage","XPath");return a}catch(f){}return null}else try{var e=new window.DOMParser;return e.parseFromString(d,"text/xml")}catch(f){return null}return null};Sys.Net.XMLHttpExecutor=function(){Sys.Net.XMLHttpExecutor.initializeBase(this);var a=this;this._xmlHttpRequest=null;this._webRequest=null;this._responseAvailable=false;this._timedOut=false;this._timer=null;this._aborted=false;this._started=false;this._onReadyStateChange=function(){if(a._xmlHttpRequest.readyState===4){a._clearTimer();a._responseAvailable=true;a._webRequest.completed(Sys.EventArgs.Empty);if(a._xmlHttpRequest!=null){a._xmlHttpRequest.onreadystatechange=Function.emptyMethod;a._xmlHttpRequest=null}}};this._clearTimer=function(){if(a._timer!=null){window.clearTimeout(a._timer);a._timer=null}};this._onTimeout=function(){if(!a._responseAvailable){a._clearTimer();a._timedOut=true;a._xmlHttpRequest.onreadystatechange=Function.emptyMethod;a._xmlHttpRequest.abort();a._webRequest.completed(Sys.EventArgs.Empty);a._xmlHttpRequest=null}}};Sys.Net.XMLHttpExecutor.prototype={get_timedOut:function(){return this._timedOut},get_started:function(){return this._started},get_responseAvailable:function(){return this._responseAvailable},get_aborted:function(){return this._aborted},executeRequest:function(){this._webRequest=this.get_webRequest();var c=this._webRequest.get_body(),a=this._webRequest.get_headers();this._xmlHttpRequest=new XMLHttpRequest;this._xmlHttpRequest.onreadystatechange=this._onReadyStateChange;var e=this._webRequest.get_httpVerb();this._xmlHttpRequest.open(e,this._webRequest.getResolvedUrl(),true);if(a)for(var b in a){var f=a[b];if(typeof f!=="function")this._xmlHttpRequest.setRequestHeader(b,f)}if(e.toLowerCase()==="post"){if(a===null||!a["Content-Type"])this._xmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");if(!c)c=""}var d=this._webRequest.get_timeout();if(d>0)this._timer=window.setTimeout(Function.createDelegate(this,this._onTimeout),d);this._xmlHttpRequest.send(c);this._started=true},getResponseHeader:function(b){var a;try{a=this._xmlHttpRequest.getResponseHeader(b)}catch(c){}if(!a)a="";return a},getAllResponseHeaders:function(){return this._xmlHttpRequest.getAllResponseHeaders()},get_responseData:function(){return this._xmlHttpRequest.responseText},get_statusCode:function(){return this._xmlHttpRequest.status},get_statusText:function(){return this._xmlHttpRequest.statusText},get_xml:function(){var a=this._xmlHttpRequest.responseXML;if(!a||!a.documentElement){a=new XMLDOM(this._xmlHttpRequest.responseText);if(!a||!a.documentElement)return null}else if(navigator.userAgent.indexOf("MSIE")!==-1)a.setProperty("SelectionLanguage","XPath");if(a.documentElement.namespaceURI==="https://web.archive.org/web/20070930213214/http://www.mozilla.org/newlayout/xml/parsererror.xml"&&a.documentElement.tagName==="parsererror")return null;if(a.documentElement.firstChild&&a.documentElement.firstChild.tagName==="parsererror")return null;return a},abort:function(){if(this._aborted||this._responseAvailable||this._timedOut)return;this._aborted=true;this._clearTimer();if(this._xmlHttpRequest&&!this._responseAvailable){this._xmlHttpRequest.onreadystatechange=Function.emptyMethod;this._xmlHttpRequest.abort();this._xmlHttpRequest=null;var a=this._webRequest._get_eventHandlerList().getHandler("completed");if(a)a(this,Sys.EventArgs.Empty)}}};Sys.Net.XMLHttpExecutor.registerClass("Sys.Net.XMLHttpExecutor",Sys.Net.WebRequestExecutor);Sys.Net._WebRequestManager=function(){this._this=this;this._defaultTimeout=0;this._defaultExecutorType="Sys.Net.XMLHttpExecutor"};Sys.Net._WebRequestManager.prototype={add_invokingRequest:function(a){this._get_eventHandlerList().addHandler("invokingRequest",a)},remove_invokingRequest:function(a){this._get_eventHandlerList().removeHandler("invokingRequest",a)},add_completedRequest:function(a){this._get_eventHandlerList().addHandler("completedRequest",a)},remove_completedRequest:function(a){this._get_eventHandlerList().removeHandler("completedRequest",a)},_get_eventHandlerList:function(){if(!this._events)this._events=new Sys.EventHandlerList;return this._events},get_defaultTimeout:function(){return this._defaultTimeout},set_defaultTimeout:function(a){this._defaultTimeout=a},get_defaultExecutorType:function(){return this._defaultExecutorType},set_defaultExecutorType:function(a){this._defaultExecutorType=a},executeRequest:function(webRequest){var executor=webRequest.get_executor();if(!executor){var failed=false;try{var executorType=eval(this._defaultExecutorType);executor=new executorType}catch(a){failed=true}webRequest.set_executor(executor)}if(executor.get_aborted())return;var evArgs=new Sys.Net.NetworkRequestEventArgs(webRequest),handler=this._get_eventHandlerList().getHandler("invokingRequest");if(handler)handler(this,evArgs);if(!evArgs.get_cancel())executor.executeRequest()}};Sys.Net._WebRequestManager.registerClass("Sys.Net._WebRequestManager");Sys.Net.WebRequestManager=new Sys.Net._WebRequestManager;Sys.Net.NetworkRequestEventArgs=function(a){Sys.Net.NetworkRequestEventArgs.initializeBase(this);this._webRequest=a};Sys.Net.NetworkRequestEventArgs.prototype={get_webRequest:function(){return this._webRequest}};Sys.Net.NetworkRequestEventArgs.registerClass("Sys.Net.NetworkRequestEventArgs",Sys.CancelEventArgs);Sys.Net.WebRequest=function(){this._url="";this._headers={};this._body=null;this._userContext=null;this._httpVerb=null;this._executor=null;this._invokeCalled=false;this._timeout=0};Sys.Net.WebRequest.prototype={add_completed:function(a){this._get_eventHandlerList().addHandler("completed",a)},remove_completed:function(a){this._get_eventHandlerList().removeHandler("completed",a)},completed:function(b){var a=Sys.Net.WebRequestManager._get_eventHandlerList().getHandler("completedRequest");if(a)a(this._executor,b);a=this._get_eventHandlerList().getHandler("completed");if(a)a(this._executor,b)},_get_eventHandlerList:function(){if(!this._events)this._events=new Sys.EventHandlerList;return this._events},get_url:function(){return this._url},set_url:function(a){this._url=a},get_headers:function(){return this._headers},get_httpVerb:function(){if(this._httpVerb===null){if(this._body===null)return"GET";return"POST"}return this._httpVerb},set_httpVerb:function(a){this._httpVerb=a},get_body:function(){return this._body},set_body:function(a){this._body=a},get_userContext:function(){return this._userContext},set_userContext:function(a){this._userContext=a},get_executor:function(){return this._executor},set_executor:function(a){this._executor=a;this._executor._set_webRequest(this)},get_timeout:function(){if(this._timeout===0)return Sys.Net.WebRequestManager.get_defaultTimeout();return this._timeout},set_timeout:function(a){this._timeout=a},getResolvedUrl:function(){return Sys.Net.WebRequest._resolveUrl(this._url)},invoke:function(){Sys.Net.WebRequestManager.executeRequest(this);this._invokeCalled=true}};Sys.Net.WebRequest._resolveUrl=function(b,a){if(b&&b.indexOf("://")!==-1)return b;if(!a||a.length===0){var c=document.getElementsByTagName("base")[0];if(c&&c.href&&c.href.length>0)a=c.href;else a=document.URL}var d=a.indexOf("?");if(d!==-1)a=a.substr(0,d);a=a.substr(0,a.lastIndexOf("/")+1);if(!b||b.length===0)return a;if(b.charAt(0)==="/"){var e=a.indexOf("://"),g=a.indexOf("/",e+3);return a.substr(0,g)+b}else{var f=a.lastIndexOf("/");return a.substr(0,f+1)+b}};Sys.Net.WebRequest._createQueryString=function(d,b){if(!b)b=encodeURIComponent;var a=new Sys.StringBuilder,f=0;for(var c in d){var e=d[c];if(typeof e==="function")continue;var g=Sys.Serialization.JavaScriptSerializer.serialize(e);if(f!==0)a.append("&");a.append(c);a.append("=");a.append(b(g));f++}return a.toString()};Sys.Net.WebRequest._createUrl=function(a,b){if(!b)return a;var d=Sys.Net.WebRequest._createQueryString(b);if(d.length>0){var c="?";if(a&&a.indexOf("?")!==-1)c="&";return a+c+d}else return a};Sys.Net.WebRequest.registerClass("Sys.Net.WebRequest");Sys.Net.WebServiceProxy=function(){};Sys.Net.WebServiceProxy.prototype={set_timeout:function(a){this._timeout=a},get_timeout:function(){return this._timeout},set_defaultUserContext:function(a){this._userContext=a},get_defaultUserContext:function(){return this._userContext},set_defaultSucceededCallback:function(a){this._succeeded=a},get_defaultSucceededCallback:function(){return this._succeeded},set_defaultFailedCallback:function(a){this._failed=a},get_defaultFailedCallback:function(){return this._failed},set_path:function(a){this._path=a},get_path:function(){return this._path},_invoke:function(d,e,g,f,c,b,a){if(c===null||typeof c==="undefined")c=this.get_defaultSucceededCallback();if(b===null||typeof b==="undefined")b=this.get_defaultFailedCallback();if(a===null||typeof a==="undefined")a=this.get_defaultUserContext();return Sys.Net.WebServiceProxy.invoke(d,e,g,f,c,b,a,this.get_timeout())}};Sys.Net.WebServiceProxy.registerClass("Sys.Net.WebServiceProxy");Sys.Net.WebServiceProxy.invoke=function(k,a,j,d,i,c,f,h){var b=new Sys.Net.WebRequest;b.get_headers()["Content-Type"]="application/json; charset=utf-8";if(!d)d={};var g=d;if(!j||!g)g={};b.set_url(Sys.Net.WebRequest._createUrl(k+"/"+a,g));var e=null;if(!j){e=Sys.Serialization.JavaScriptSerializer.serialize(d);if(e==="{}")e=""}b.set_body(e);b.add_completed(l);if(h&&h>0)b.set_timeout(h);b.invoke();function l(d){if(d.get_responseAvailable()){var e=d.get_statusCode(),b=null;try{var j=d.getResponseHeader("Content-Type");if(j.startsWith("application/json"))b=d.get_object();else if(j.startsWith("text/xml"))b=d.get_xml();else b=d.get_responseData()}catch(m){}var k=d.getResponseHeader("jsonerror"),g=k==="true";if(g)b=new Sys.Net.WebServiceError(false,b.Message,b.StackTrace,b.ExceptionType);if(e<200||e>=300||g){if(c){if(!b||!g)b=new Sys.Net.WebServiceError(false,String.format(Sys.Res.webServiceFailedNoMsg,a),"","");b._statusCode=e;c(b,f,a)}}else if(i)i(b,f,a)}else{var h;if(d.get_timedOut())h=String.format(Sys.Res.webServiceTimedOut,a);else h=String.format(Sys.Res.webServiceFailedNoMsg,a);if(c)c(new Sys.Net.WebServiceError(d.get_timedOut(),h,"",""),f,a)}}return b};Sys.Net.WebServiceProxy._generateTypedConstructor=function(a){return function(b){if(b)for(var c in b)this[c]=b[c];this.__Type=a}};Sys.Net.WebServiceError=function(c,d,b,a){this._timedOut=c;this._message=d;this._stackTrace=b;this._exceptionType=a;this._statusCode=-1};Sys.Net.WebServiceError.prototype={get_timedOut:function(){return this._timedOut},get_statusCode:function(){return this._statusCode},get_message:function(){return this._message},get_stackTrace:function(){return this._stackTrace},get_exceptionType:function(){return this._exceptionType}};Sys.Net.WebServiceError.registerClass("Sys.Net.WebServiceError");Type.registerNamespace("Sys.Services");Sys.Services._ProfileService=function(){Sys.Services._ProfileService.initializeBase(this);this.properties={}};Sys.Services._ProfileService.DefaultWebServicePath="";Sys.Services._ProfileService.prototype={_defaultFailedCallback:null,_defaultLoadCompletedCallback:null,_defaultSaveCompletedCallback:null,_path:"",_timeout:0,get_defaultFailedCallback:function(){return this._defaultFailedCallback},set_defaultFailedCallback:function(a){this._defaultFailedCallback=a},get_defaultLoadCompletedCallback:function(){return this._defaultLoadCompletedCallback},set_defaultLoadCompletedCallback:function(a){this._defaultLoadCompletedCallback=a},get_defaultSaveCompletedCallback:function(){return this._defaultSaveCompletedCallback},set_defaultSaveCompletedCallback:function(a){this._defaultSaveCompletedCallback=a},get_path:function(){return this._path},set_path:function(a){if(!a||!a.length)a="";this._path=a},get_timeout:function(){return this._timeout},set_timeout:function(a){this._timeout=a},load:function(b,d,e,f){var c={},a;if(!b)a="GetAllPropertiesForCurrentUser";else{a="GetPropertiesForCurrentUser";c={properties:this._clonePropertyNames(b)}}this._invoke(this._get_path(),a,false,c,Function.createDelegate(this,this._onLoadComplete),Function.createDelegate(this,this._onLoadFailed),[d,e,f])},save:function(d,a,c,e){var b=this._flattenProperties(d,this.properties);this._invoke(this._get_path(),"SetPropertiesForCurrentUser",false,{values:b},Function.createDelegate(this,this._onSaveComplete),Function.createDelegate(this,this._onSaveFailed),[a,c,e])},_clonePropertyNames:function(e){var c=[],d={};for(var b=0;b<e.length;b++){var a=e[b];if(!d[a]){Array.add(c,a);d[a]=true}}return c},_flattenProperties:function(a,h,i){var b={},e,d;if(a&&a.length===0)return b;for(var c in h){e=h[c];d=i?i+"."+c:c;if(Sys.Services.ProfileGroup.isInstanceOfType(e)){var g=this._flattenProperties(a,e,d);for(var f in g){var j=g[f];b[f]=j}}else if(!a||Array.indexOf(a,d)!==-1)b[d]=e}return b},_get_path:function(){var a=this.get_path();if(!a.length)a=Sys.Services._ProfileService.DefaultWebServicePath;if(!a||!a.length)throw Error.invalidOperation(Sys.Res.servicePathNotSet);return a},_onLoadComplete:function(a,f,g){if(typeof a!=="object")throw Error.invalidOperation(String.format(Sys.Res.webServiceInvalidReturnType,g,"Object"));var d=this._unflattenProperties(a);for(var b in d)this.properties[b]=d[b];var c=f[0],e=c?c:this._defaultLoadCompletedCallback;if(e)e(a.length,f[2],"Sys.Services.ProfileService.load")},_onLoadFailed:function(d,c){var a=c[1],b=a?a:this._defaultFailedCallback;if(b)b(d,c[2],"Sys.Services.ProfileService.load")},_onSaveComplete:function(d,c,f){if(typeof d!=="number")throw Error.invalidOperation(String.format(Sys.Res.webServiceInvalidReturnType,f,"Number"));var a=c[0],e=c[2],b=a?a:this._defaultSaveCompletedCallback;if(b)b(d,e,"Sys.Services.ProfileService.save")},_onSaveFailed:function(e,c){var a=c[1],d=c[2],b=a?a:this._defaultFailedCallback;if(b)b(e,d,"Sys.Services.ProfileService.save")},_unflattenProperties:function(e){var c={},d,f,h=0;for(var a in e){h++;f=e[a];d=a.indexOf(".");if(d!==-1){var g=a.substr(0,d);a=a.substr(d+1);var b=c[g];if(!b||!Sys.Services.ProfileGroup.isInstanceOfType(b)){b=new Sys.Services.ProfileGroup;c[g]=b}b[a]=f}else c[a]=f}e.length=h;return c}};Sys.Services._ProfileService.registerClass("Sys.Services._ProfileService",Sys.Net.WebServiceProxy);Sys.Services.ProfileService=new Sys.Services._ProfileService;Sys.Services.ProfileGroup=function(a){if(a)for(var b in a)this[b]=a[b]};Sys.Services.ProfileGroup.registerClass("Sys.Services.ProfileGroup");Sys.Services._AuthenticationService=function(){Sys.Services._AuthenticationService.initializeBase(this)};Sys.Services._AuthenticationService.DefaultWebServicePath="";Sys.Services._AuthenticationService.prototype={_defaultFailedCallback:null,_defaultLoginCompletedCallback:null,_defaultLogoutCompletedCallback:null,_path:"",_timeout:0,_authenticated:false,get_defaultFailedCallback:function(){return this._defaultFailedCallback},set_defaultFailedCallback:function(a){this._defaultFailedCallback=a},get_defaultLoginCompletedCallback:function(){return this._defaultLoginCompletedCallback},set_defaultLoginCompletedCallback:function(a){this._defaultLoginCompletedCallback=a},get_defaultLogoutCompletedCallback:function(){return this._defaultLogoutCompletedCallback},set_defaultLogoutCompletedCallback:function(a){this._defaultLogoutCompletedCallback=a},get_isLoggedIn:function(){return this._authenticated},get_path:function(){return this._path},set_path:function(a){if(!a||!a.length)a="";this._path=a},get_timeout:function(){return this._timeout},set_timeout:function(a){this._timeout=a},login:function(c,b,a,h,f,d,e,g){this._invoke(this._get_path(),"Login",false,{userName:c,password:b,createPersistentCookie:a},Function.createDelegate(this,this._onLoginComplete),Function.createDelegate(this,this._onLoginFailed),[c,b,a,f,d,e,g])},logout:function(c,a,b,d){this._invoke(this._get_path(),"Logout",false,{},Function.createDelegate(this,this._onLogoutComplete),Function.createDelegate(this,this._onLogoutFailed),[c,a,b,d])},_get_path:function(){var a=this.get_path();if(!a.length)a=Sys.Services._AuthenticationService.DefaultWebServicePath;if(!a||!a.length)throw Error.invalidOperation(Sys.Res.servicePathNotSet);return a},_onLoginComplete:function(f,c,g){if(typeof f!=="boolean")throw Error.invalidOperation(String.format(Sys.Res.webServiceInvalidReturnType,g,"Boolean"));var b=c[3],d=c[4],e=c[6],a=d?d:this._defaultLoginCompletedCallback;if(f){this._authenticated=true;if(a)a(true,e,"Sys.Services.AuthenticationService.login");if(typeof b!=="undefined"&&b!==null)window.location.href=b}else if(a)a(false,e,"Sys.Services.AuthenticationService.login")},_onLoginFailed:function(d,c){var a=c[5],b=a?a:this._defaultFailedCallback;if(b)b(d,c[6],"Sys.Services.AuthenticationService.login")},_onLogoutComplete:function(g,a,f){if(g!==null)throw Error.invalidOperation(String.format(Sys.Res.webServiceInvalidReturnType,f,"null"));var c=a[0],b=a[1],e=a[3],d=b?b:this._defaultLogoutCompletedCallback;this._authenticated=false;if(d)d(null,e,"Sys.Services.AuthenticationService.logout");if(!c)window.location.reload();else window.location.href=c},_onLogoutFailed:function(d,c){var a=c[2],b=a?a:this._defaultFailedCallback;if(b)b(d,c[3],"Sys.Services.AuthenticationService.logout")},_setAuthenticated:function(a){this._authenticated=a}};Sys.Services._AuthenticationService.registerClass("Sys.Services._AuthenticationService",Sys.Net.WebServiceProxy);Sys.Services.AuthenticationService=new Sys.Services._AuthenticationService;Type.registerNamespace("Sys.Serialization");Sys.Serialization.JavaScriptSerializer=function(){};Sys.Serialization.JavaScriptSerializer.registerClass("Sys.Serialization.JavaScriptSerializer");Sys.Serialization.JavaScriptSerializer._stringRegEx=new RegExp('["\b\f\n\r\t\\\\\x00-\x1F]',"i");Sys.Serialization.JavaScriptSerializer._serializeWithBuilder=function(b,a,h){var c;switch(typeof b){case"object":if(b)if(Array.isInstanceOfType(b)){a.append("[");for(c=0;c<b.length;++c){if(c>0)a.append(",");Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(b[c],a)}a.append("]")}else{if(Date.isInstanceOfType(b)){a.append('"\\/Date(');a.append(b.getTime());a.append(')\\/"');break}var e=[],i=0;for(var g in b){if(g.startsWith("$"))continue;e[i++]=g}if(h)e.sort();a.append("{");var j=false;for(c=0;c<i;c++){var f=b[e[c]];if(typeof f!=="undefined"&&typeof f!=="function"){if(j)a.append(",");else j=true;Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(e[c],a,h);a.append(":");Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(f,a,h)}}a.append("}")}else a.append("null");break;case"number":if(isFinite(b))a.append(String(b));else throw Error.invalidOperation(Sys.Res.cannotSerializeNonFiniteNumbers);break;case"string":a.append('"');if(Sys.Browser.agent===Sys.Browser.Safari||Sys.Serialization.JavaScriptSerializer._stringRegEx.test(b)){var k=b.length;for(c=0;c<k;++c){var d=b.charAt(c);if(d>=" "){if(d==="\\"||d==='"')a.append("\\");a.append(d)}else switch(d){case"\b":a.append("\\b");break;case"\f":a.append("\\f");break;case"\n":a.append("\\n");break;case"\r":a.append("\\r");break;case"\t":a.append("\\t");break;default:a.append("\\u00");if(d.charCodeAt()<16)a.append("0");a.append(d.charCodeAt().toString(16))}}}else a.append(b);a.append('"');break;case"boolean":a.append(b.toString());break;default:a.append("null");break}};Sys.Serialization.JavaScriptSerializer.serialize=function(b){var a=new Sys.StringBuilder;Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(b,a,false);return a.toString()};Sys.Serialization.JavaScriptSerializer.deserialize=function(data){if(data.length===0)throw Error.argument("data",Sys.Res.cannotDeserializeEmptyString);try{var exp=data.replace(new RegExp('(^|[^\\\\])\\"\\\\/Date\\((-?[0-9]+)\\)\\\\/\\"',"g"),"$1new Date($2)");return eval("("+exp+")")}catch(a){throw Error.argument("data",Sys.Res.cannotDeserializeInvalidJson)}};Sys.CultureInfo=function(c,b,a){this.name=c;this.numberFormat=b;this.dateTimeFormat=a};Sys.CultureInfo.prototype={_getDateTimeFormats:function(){if(!this._dateTimeFormats){var a=this.dateTimeFormat;this._dateTimeFormats=[a.MonthDayPattern,a.YearMonthPattern,a.ShortDatePattern,a.ShortTimePattern,a.LongDatePattern,a.LongTimePattern,a.FullDateTimePattern,a.RFC1123Pattern,a.SortableDateTimePattern,a.UniversalSortableDateTimePattern]}return this._dateTimeFormats},_getMonthIndex:function(a){if(!this._upperMonths)this._upperMonths=this._toUpperArray(this.dateTimeFormat.MonthNames);return Array.indexOf(this._upperMonths,this._toUpper(a))},_getAbbrMonthIndex:function(a){if(!this._upperAbbrMonths)this._upperAbbrMonths=this._toUpperArray(this.dateTimeFormat.AbbreviatedMonthNames);return Array.indexOf(this._upperMonths,this._toUpper(a))},_getDayIndex:function(a){if(!this._upperDays)this._upperDays=this._toUpperArray(this.dateTimeFormat.DayNames);return Array.indexOf(this._upperDays,this._toUpper(a))},_getAbbrDayIndex:function(a){if(!this._upperAbbrDays)this._upperAbbrDays=this._toUpperArray(this.dateTimeFormat.AbbreviatedDayNames);return Array.indexOf(this._upperAbbrDays,this._toUpper(a))},_toUpperArray:function(c){var b=[];for(var a=0,d=c.length;a<d;a++)b[a]=this._toUpper(c[a]);return b},_toUpper:function(a){return a.split("\u00A0").join(" ").toUpperCase()}};Sys.CultureInfo._parse=function(b){var a=Sys.Serialization.JavaScriptSerializer.deserialize(b);return new Sys.CultureInfo(a.name,a.numberFormat,a.dateTimeFormat)};Sys.CultureInfo.registerClass("Sys.CultureInfo");Sys.CultureInfo.InvariantCulture=Sys.CultureInfo._parse('{"name":"","numberFormat":{"CurrencyDecimalDigits":2,"CurrencyDecimalSeparator":".","IsReadOnly":true,"CurrencyGroupSizes":[3],"NumberGroupSizes":[3],"PercentGroupSizes":[3],"CurrencyGroupSeparator":",","CurrencySymbol":"\u00A4","NaNSymbol":"NaN","CurrencyNegativePattern":0,"NumberNegativePattern":1,"PercentPositivePattern":0,"PercentNegativePattern":0,"NegativeInfinitySymbol":"-Infinity","NegativeSign":"-","NumberDecimalDigits":2,"NumberDecimalSeparator":".","NumberGroupSeparator":",","CurrencyPositivePattern":0,"PositiveInfinitySymbol":"Infinity","PositiveSign":"+","PercentDecimalDigits":2,"PercentDecimalSeparator":".","PercentGroupSeparator":",","PercentSymbol":"%","PerMilleSymbol":"\u2030","NativeDigits":["0","1","2","3","4","5","6","7","8","9"],"DigitSubstitution":1},"dateTimeFormat":{"AMDesignator":"AM","Calendar":{"MinSupportedDateTime":"@-62135568000000@","MaxSupportedDateTime":"@253402300799999@","AlgorithmType":1,"CalendarType":1,"Eras":[1],"TwoDigitYearMax":2029,"IsReadOnly":true},"DateSeparator":"/","FirstDayOfWeek":0,"CalendarWeekRule":0,"FullDateTimePattern":"dddd, dd MMMM yyyy HH:mm:ss","LongDatePattern":"dddd, dd MMMM yyyy","LongTimePattern":"HH:mm:ss","MonthDayPattern":"MMMM dd","PMDesignator":"PM","RFC1123Pattern":"ddd, dd MMM yyyy HH\':\'mm\':\'ss \'GMT\'","ShortDatePattern":"MM/dd/yyyy","ShortTimePattern":"HH:mm","SortableDateTimePattern":"yyyy\'-\'MM\'-\'dd\'T\'HH\':\'mm\':\'ss","TimeSeparator":":","UniversalSortableDateTimePattern":"yyyy\'-\'MM\'-\'dd HH\':\'mm\':\'ss\'Z\'","YearMonthPattern":"yyyy MMMM","AbbreviatedDayNames":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"ShortestDayNames":["Su","Mo","Tu","We","Th","Fr","Sa"],"DayNames":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"AbbreviatedMonthNames":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""],"MonthNames":["January","February","March","April","May","June","July","August","September","October","November","December",""],"IsReadOnly":true,"NativeCalendarName":"Gregorian Calendar","AbbreviatedMonthGenitiveNames":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""],"MonthGenitiveNames":["January","February","March","April","May","June","July","August","September","October","November","December",""]}}');if(typeof __cultureInfo==="undefined")var __cultureInfo='{"name":"en-US","numberFormat":{"CurrencyDecimalDigits":2,"CurrencyDecimalSeparator":".","IsReadOnly":false,"CurrencyGroupSizes":[3],"NumberGroupSizes":[3],"PercentGroupSizes":[3],"CurrencyGroupSeparator":",","CurrencySymbol":"$","NaNSymbol":"NaN","CurrencyNegativePattern":0,"NumberNegativePattern":1,"PercentPositivePattern":0,"PercentNegativePattern":0,"NegativeInfinitySymbol":"-Infinity","NegativeSign":"-","NumberDecimalDigits":2,"NumberDecimalSeparator":".","NumberGroupSeparator":",","CurrencyPositivePattern":0,"PositiveInfinitySymbol":"Infinity","PositiveSign":"+","PercentDecimalDigits":2,"PercentDecimalSeparator":".","PercentGroupSeparator":",","PercentSymbol":"%","PerMilleSymbol":"\u2030","NativeDigits":["0","1","2","3","4","5","6","7","8","9"],"DigitSubstitution":1},"dateTimeFormat":{"AMDesignator":"AM","Calendar":{"MinSupportedDateTime":"@-62135568000000@","MaxSupportedDateTime":"@253402300799999@","AlgorithmType":1,"CalendarType":1,"Eras":[1],"TwoDigitYearMax":2029,"IsReadOnly":false},"DateSeparator":"/","FirstDayOfWeek":0,"CalendarWeekRule":0,"FullDateTimePattern":"dddd, MMMM dd, yyyy h:mm:ss tt","LongDatePattern":"dddd, MMMM dd, yyyy","LongTimePattern":"h:mm:ss tt","MonthDayPattern":"MMMM dd","PMDesignator":"PM","RFC1123Pattern":"ddd, dd MMM yyyy HH\':\'mm\':\'ss \'GMT\'","ShortDatePattern":"M/d/yyyy","ShortTimePattern":"h:mm tt","SortableDateTimePattern":"yyyy\'-\'MM\'-\'dd\'T\'HH\':\'mm\':\'ss","TimeSeparator":":","UniversalSortableDateTimePattern":"yyyy\'-\'MM\'-\'dd HH\':\'mm\':\'ss\'Z\'","YearMonthPattern":"MMMM, yyyy","AbbreviatedDayNames":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"ShortestDayNames":["Su","Mo","Tu","We","Th","Fr","Sa"],"DayNames":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"AbbreviatedMonthNames":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""],"MonthNames":["January","February","March","April","May","June","July","August","September","October","November","December",""],"IsReadOnly":false,"NativeCalendarName":"Gregorian Calendar","AbbreviatedMonthGenitiveNames":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""],"MonthGenitiveNames":["January","February","March","April","May","June","July","August","September","October","November","December",""]}}';Sys.CultureInfo.CurrentCulture=Sys.CultureInfo._parse(__cultureInfo);delete __cultureInfo;Sys.UI.Point=function(a,b){this.x=a;this.y=b};Sys.UI.Point.registerClass("Sys.UI.Point");Sys.UI.Bounds=function(c,d,b,a){this.x=c;this.y=d;this.height=a;this.width=b};Sys.UI.Bounds.registerClass("Sys.UI.Bounds");Sys.UI.DomElement=function(){};Sys.UI.DomElement.registerClass("Sys.UI.DomElement");Sys.UI.DomElement.addCssClass=function(a,b){if(!Sys.UI.DomElement.containsCssClass(a,b))if(a.className==="")a.className=b;else a.className+=" "+b};Sys.UI.DomElement.containsCssClass=function(b,a){return Array.contains(b.className.split(" "),a)};Sys.UI.DomElement.getBounds=function(a){var b=Sys.UI.DomElement.getLocation(a);return new Sys.UI.Bounds(b.x,b.y,a.offsetWidth||0,a.offsetHeight||0)};var $get=Sys.UI.DomElement.getElementById=function(f,e){if(!e)return document.getElementById(f);if(e.getElementById)return e.getElementById(f);var c=[],d=e.childNodes;for(var b=0;b<d.length;b++){var a=d[b];if(a.nodeType==1)c[c.length]=a}while(c.length){a=c.shift();if(a.id==f)return a;d=a.childNodes;for(b=0;b<d.length;b++){a=d[b];if(a.nodeType==1)c[c.length]=a}}return null};switch(Sys.Browser.agent){case Sys.Browser.InternetExplorer:Sys.UI.DomElement.getLocation=function Sys$UI$DomElement$getLocation(a){if(a.self||a.nodeType===9)return new Sys.UI.Point(0,0);var d=a.getClientRects();if(!d||!d.length)return new Sys.UI.Point(0,0);var e=a.ownerDocument.parentWindow,g=e.screenLeft-top.screenLeft-top.document.documentElement.scrollLeft+2,h=e.screenTop-top.screenTop-top.document.documentElement.scrollTop+2,c=e.frameElement||null;if(c){var b=c.currentStyle;g+=(c.frameBorder||1)*2+(parseInt(b.paddingLeft)||0)+(parseInt(b.borderLeftWidth)||0)-a.ownerDocument.documentElement.scrollLeft;h+=(c.frameBorder||1)*2+(parseInt(b.paddingTop)||0)+(parseInt(b.borderTopWidth)||0)-a.ownerDocument.documentElement.scrollTop}var f=d[0];return new Sys.UI.Point(f.left-g,f.top-h)};break;case Sys.Browser.Safari:Sys.UI.DomElement.getLocation=function(c){if(c.window&&c.window===c||c.nodeType===9)return new Sys.UI.Point(0,0);var g=0,h=0,j=null,f=null,b;for(var a=c;a;j=a,(f=b,a=a.offsetParent)){b=Sys.UI.DomElement._getCurrentStyle(a);var e=a.tagName;if((a.offsetLeft||a.offsetTop)&&(e!=="BODY"||(!f||f.position!=="absolute"))){g+=a.offsetLeft;h+=a.offsetTop}}b=Sys.UI.DomElement._getCurrentStyle(c);var d=b?b.position:null,k=d&&d!=="static";if(!d||d!=="absolute")for(var a=c.parentNode;a;a=a.parentNode){e=a.tagName;if(e!=="BODY"&&e!=="HTML"&&(a.scrollLeft||a.scrollTop)){g-=a.scrollLeft||0;h-=a.scrollTop||0}b=Sys.UI.DomElement._getCurrentStyle(a);var i=b?b.position:null;if(i&&i==="absolute")break}return new Sys.UI.Point(g,h)};break;case Sys.Browser.Opera:Sys.UI.DomElement.getLocation=function(b){if(b.window&&b.window===b||b.nodeType===9)return new Sys.UI.Point(0,0);var d=0,e=0,i=null;for(var a=b;a;i=a,a=a.offsetParent){var f=a.tagName;d+=a.offsetLeft||0;e+=a.offsetTop||0}var g=b.style.position,c=g&&g!=="static";for(var a=b.parentNode;a;a=a.parentNode){f=a.tagName;if(f!=="BODY"&&f!=="HTML"&&(a.scrollLeft||a.scrollTop)&&(c&&(a.style.overflow==="scroll"||a.style.overflow==="auto"))){d-=a.scrollLeft||0;e-=a.scrollTop||0}var h=a&&a.style?a.style.position:null;c=c||h&&h!=="static"}return new Sys.UI.Point(d,e)};break;default:Sys.UI.DomElement.getLocation=function(d){if(d.window&&d.window===d||d.nodeType===9)return new Sys.UI.Point(0,0);var e=0,f=0,i=null,h=null,b=null;for(var a=d;a;i=a,(h=b,a=a.offsetParent)){var c=a.tagName;b=Sys.UI.DomElement._getCurrentStyle(a);if((a.offsetLeft||a.offsetTop)&&!(c==="BODY"&&(!h||h.position!=="absolute"))){e+=a.offsetLeft;f+=a.offsetTop}if(i!==null&&b){if(c!=="TABLE"&&c!=="TD"&&c!=="HTML"){e+=parseInt(b.borderLeftWidth)||0;f+=parseInt(b.borderTopWidth)||0}if(c==="TABLE"&&(b.position==="relative"||b.position==="absolute")){e+=parseInt(b.marginLeft)||0;f+=parseInt(b.marginTop)||0}}}b=Sys.UI.DomElement._getCurrentStyle(d);var g=b?b.position:null,j=g&&g!=="static";if(!g||g!=="absolute")for(var a=d.parentNode;a;a=a.parentNode){c=a.tagName;if(c!=="BODY"&&c!=="HTML"&&(a.scrollLeft||a.scrollTop)){e-=a.scrollLeft||0;f-=a.scrollTop||0;b=Sys.UI.DomElement._getCurrentStyle(a);e+=parseInt(b.borderLeftWidth)||0;f+=parseInt(b.borderTopWidth)||0}}return new Sys.UI.Point(e,f)};break}Sys.UI.DomElement.removeCssClass=function(d,c){var a=" "+d.className+" ",b=a.indexOf(" "+c+" ");if(b>=0)d.className=(a.substr(0,b)+" "+a.substring(b+c.length+1,a.length)).trim()};Sys.UI.DomElement.setLocation=function(b,c,d){var a=b.style;a.position="absolute";a.left=c+"px";a.top=d+"px"};Sys.UI.DomElement.toggleCssClass=function(b,a){if(Sys.UI.DomElement.containsCssClass(b,a))Sys.UI.DomElement.removeCssClass(b,a);else Sys.UI.DomElement.addCssClass(b,a)};Sys.UI.DomElement._getCurrentStyle=function(a){var b=(a.ownerDocument?a.ownerDocument:a.documentElement).defaultView;return b&&a!==b&&b.getComputedStyle?b.getComputedStyle(a,null):a.style};Sys.UI.Behavior=function(b){Sys.UI.Behavior.initializeBase(this);this._element=b;var a=b._behaviors;if(!a)b._behaviors=[this];else a[a.length]=this};Sys.UI.Behavior.prototype={_name:null,get_element:function(){return this._element},get_id:function(){var a=Sys.UI.Behavior.callBaseMethod(this,"get_id");if(a)return a;if(!this._element||!this._element.id)return"";return this._element.id+"$"+this.get_name()},get_name:function(){if(this._name)return this._name;var a=Object.getTypeName(this),b=a.lastIndexOf(".");if(b!=-1)a=a.substr(b+1);if(!this.get_isInitialized())this._name=a;return a},set_name:function(a){this._name=a},initialize:function(){Sys.UI.Behavior.callBaseMethod(this,"initialize");var a=this.get_name();if(a)this._element[a]=this},dispose:function(){Sys.UI.Behavior.callBaseMethod(this,"dispose");if(this._element){var a=this.get_name();if(a)this._element[a]=null;Array.remove(this._element._behaviors,this);delete this._element}}};Sys.UI.Behavior.registerClass("Sys.UI.Behavior",Sys.Component);Sys.UI.Behavior.getBehaviorByName=function(b,c){var a=b[c];return a&&Sys.UI.Behavior.isInstanceOfType(a)?a:null};Sys.UI.Behavior.getBehaviors=function(a){if(!a._behaviors)return[];return Array.clone(a._behaviors)};Sys.UI.Behavior.getBehaviorsByType=function(d,e){var a=d._behaviors,c=[];if(a)for(var b=0,f=a.length;b<f;b++)if(e.isInstanceOfType(a[b]))c[c.length]=a[b];return c};Sys.UI.VisibilityMode=function(){throw Error.notImplemented()};Sys.UI.VisibilityMode.prototype={hide:0,collapse:1};Sys.UI.VisibilityMode.registerEnum("Sys.UI.VisibilityMode");Sys.UI.Control=function(a){Sys.UI.Control.initializeBase(this);this._element=a;a.control=this;this._oldDisplayMode=this._element.style.display;if(!this._oldDisplayMode||this._oldDisplayMode=="none")this._oldDisplayMode=""};Sys.UI.Control.prototype={_parent:null,_visibilityMode:Sys.UI.VisibilityMode.hide,get_element:function(){return this._element},get_id:function(){if(!this._element)return"";return this._element.id},set_id:function(){throw Error.invalidOperation(Sys.Res.cantSetId)},get_parent:function(){if(this._parent)return this._parent;else{var a=this._element.parentNode;while(a){if(a.control)return a.control;a=a.parentNode}return null}},set_parent:function(a){this._parent=a},get_visibilityMode:function(){return this._visibilityMode},set_visibilityMode:function(a){if(this._visibilityMode!==a){this._visibilityMode=a;if(this.get_visible()===false)if(this._visibilityMode===Sys.UI.VisibilityMode.hide)this._element.style.display=this._oldDisplayMode;else this._element.style.display="none"}this._visibilityMode=a},get_visible:function(){return this._element.style.visibility!="hidden"},set_visible:function(a){if(a!=this.get_visible()){this._element.style.visibility=a?"visible":"hidden";if(a||this._visibilityMode===Sys.UI.VisibilityMode.hide)this._element.style.display=this._oldDisplayMode;else this._element.style.display="none"}},addCssClass:function(a){Sys.UI.DomElement.addCssClass(this._element,a)},dispose:function(){Sys.UI.Control.callBaseMethod(this,"dispose");if(this._element){this._element.control=undefined;delete this._element}},initialize:function(){Sys.UI.Control.callBaseMethod(this,"initialize");var a=this._element},onBubbleEvent:function(){return false},raiseBubbleEvent:function(b,c){var a=this.get_parent();while(a){if(a.onBubbleEvent(b,c))return;a=a.get_parent()}},removeCssClass:function(a){Sys.UI.DomElement.removeCssClass(this._element,a)},toggleCssClass:function(a){Sys.UI.DomElement.toggleCssClass(this._element,a)}};Sys.UI.Control.registerClass("Sys.UI.Control",Sys.Component)
Sys.Res={'argumentInteger':'Value must be an integer.','scriptLoadMultipleCallbacks':'The script \'{0}\' contains multiple calls to Sys.Application.notifyScriptLoaded(). Only one is allowed.','invokeCalledTwice':'Cannot call invoke more than once.','webServiceFailed':'The server method \'{0}\' failed with the following error: {1}','argumentType':'Object cannot be converted to the required type.','argumentNull':'Value cannot be null.','controlCantSetId':'The id property can\'t be set on a control.','formatBadFormatSpecifier':'Format specifier was invalid.','webServiceFailedNoMsg':'The server method \'{0}\' failed.','argumentDomElement':'Value must be a DOM element.','invalidExecutorType':'Could not create a valid Sys.Net.WebRequestExecutor from: {0}.','cannotCallBeforeResponse':'Cannot call {0} when responseAvailable is false.','actualValue':'Actual value was {0}.','enumInvalidValue':'\'{0}\' is not a valid value for enum {1}.','scriptLoadFailed':'The script \'{0}\' could not be loaded.','parameterCount':'Parameter count mismatch.','cannotDeserializeEmptyString':'Cannot deserialize empty string.','formatInvalidString':'Input string was not in a correct format.','invalidTimeout':'Value must be greater than or equal to zero.','cannotAbortBeforeStart':'Cannot abort when executor has not started.','argument':'Value does not fall within the expected range.','cannotDeserializeInvalidJson':'Cannot deserialize. The data does not correspond to valid JSON.','invalidHttpVerb':'httpVerb cannot be set to an empty or null string.','nullWebRequest':'Cannot call executeRequest with a null webRequest.','eventHandlerInvalid':'Handler was not added through the Sys.UI.DomEvent.addHandler method.','cannotSerializeNonFiniteNumbers':'Cannot serialize non finite numbers.','argumentUndefined':'Value cannot be undefined.','webServiceInvalidReturnType':'The server method \'{0}\' returned an invalid type. Expected type: {1}','servicePathNotSet':'The path to the web service has not been set.','argumentTypeWithTypes':'Object of type \'{0}\' cannot be converted to type \'{1}\'.','cannotCallOnceStarted':'Cannot call {0} once started.','badBaseUrl1':'Base URL does not contain ://.','badBaseUrl2':'Base URL does not contain another /.','badBaseUrl3':'Cannot find last / in base URL.','setExecutorAfterActive':'Cannot set executor after it has become active.','paramName':'Parameter name: {0}','cannotCallOutsideHandler':'Cannot call {0} outside of a completed event handler.','format':'One of the identified items was in an invalid format.','assertFailedCaller':'Assertion Failed: {0}\r\nat {1}','argumentOutOfRange':'Specified argument was out of the range of valid values.','webServiceTimedOut':'The server method \'{0}\' timed out.','notImplemented':'The method or operation is not implemented.','assertFailed':'Assertion Failed: {0}','invalidOperation':'Operation is not valid due to the current state of the object.','breakIntoDebugger':'{0}\r\n\r\nBreak into debugger?'};
if(typeof(Sys)!=='undefined')Sys.Application.notifyScriptLoaded();
var AddressBookWS=function(){
AddressBookWS.initializeBase(this);
this._timeout=0;
this._userContext=null;
this._succeeded=null;
this._failed=null;}
AddressBookWS.prototype={
Delete:function(contactId,moduleId,userGuid,succeededCallback,failedCallback,userContext){
return this._invoke(AddressBookWS.get_path(),'Delete',true,{contactId:contactId,moduleId:moduleId,userGuid:userGuid},succeededCallback,failedCallback,userContext);},
GetContactById:function(contactId,moduleId,userGuid,succeededCallback,failedCallback,userContext){
return this._invoke(AddressBookWS.get_path(),'GetContactById',true,{contactId:contactId,moduleId:moduleId,userGuid:userGuid},succeededCallback,failedCallback,userContext);},
Save2:function(id,firstName,lastName,address,email,msn,yahoo,homePhone,officePhone,cellPhone,moduleId,userGuid,succeededCallback,failedCallback,userContext){
return this._invoke(AddressBookWS.get_path(),'Save2',false,{id:id,firstName:firstName,lastName:lastName,address:address,email:email,msn:msn,yahoo:yahoo,homePhone:homePhone,officePhone:officePhone,cellPhone:cellPhone,moduleId:moduleId,userGuid:userGuid},succeededCallback,failedCallback,userContext);},
Save:function(id,firstName,lastName,address,email,msn,yahoo,homePhone,officePhone,cellPhone,moduleId,userGuid,succeededCallback,failedCallback,userContext){
return this._invoke(AddressBookWS.get_path(),'Save',true,{id:id,firstName:firstName,lastName:lastName,address:address,email:email,msn:msn,yahoo:yahoo,homePhone:homePhone,officePhone:officePhone,cellPhone:cellPhone,moduleId:moduleId,userGuid:userGuid},succeededCallback,failedCallback,userContext);},
Search:function(fieldName,key,moduleId,userGuid,maxHeight,succeededCallback,failedCallback,userContext){
return this._invoke(AddressBookWS.get_path(),'Search',true,{fieldName:fieldName,key:key,moduleId:moduleId,userGuid:userGuid,maxHeight:maxHeight},succeededCallback,failedCallback,userContext);},
GetContactAddress:function(moduleID,succeededCallback,failedCallback,userContext){
return this._invoke(AddressBookWS.get_path(),'GetContactAddress',true,{moduleID:moduleID},succeededCallback,failedCallback,userContext);},
GetContactsByIndex:function(index,moduleId,userGuid,maxHeight,succeededCallback,failedCallback,userContext){
return this._invoke(AddressBookWS.get_path(),'GetContactsByIndex',true,{index:index,moduleId:moduleId,userGuid:userGuid,maxHeight:maxHeight},succeededCallback,failedCallback,userContext);},
GetLastFiveEntry:function(moduleId,userGuid,maxHeight,succeededCallback,failedCallback,userContext){
return this._invoke(AddressBookWS.get_path(),'GetLastFiveEntry',true,{moduleId:moduleId,userGuid:userGuid,maxHeight:maxHeight},succeededCallback,failedCallback,userContext);},
GetIndexLinks:function(moduleId,userGuid,succeededCallback,failedCallback,userContext){
return this._invoke(AddressBookWS.get_path(),'GetIndexLinks',true,{moduleId:moduleId,userGuid:userGuid},succeededCallback,failedCallback,userContext);},
Export:function(flakeId,userName,profile,succeededCallback,failedCallback,userContext){
return this._invoke(AddressBookWS.get_path(),'Export',false,{flakeId:flakeId,userName:userName,profile:profile},succeededCallback,failedCallback,userContext);},
Import:function(flakeId,userName,profile,data,succeededCallback,failedCallback,userContext){
return this._invoke(AddressBookWS.get_path(),'Import',false,{flakeId:flakeId,userName:userName,profile:profile,data:data},succeededCallback,failedCallback,userContext);}}
AddressBookWS.registerClass('AddressBookWS',Sys.Net.WebServiceProxy);
AddressBookWS._staticInstance=new AddressBookWS();
AddressBookWS.set_path=function(value){AddressBookWS._staticInstance._path=value;}
AddressBookWS.get_path=function(){return AddressBookWS._staticInstance._path;}
AddressBookWS.set_timeout=function(value){AddressBookWS._staticInstance._timeout=value;}
AddressBookWS.get_timeout=function(){return AddressBookWS._staticInstance._timeout;}
AddressBookWS.set_defaultUserContext=function(value){AddressBookWS._staticInstance._userContext=value;}
AddressBookWS.get_defaultUserContext=function(){return AddressBookWS._staticInstance._userContext;}
AddressBookWS.set_defaultSucceededCallback=function(value){AddressBookWS._staticInstance._succeeded=value;}
AddressBookWS.get_defaultSucceededCallback=function(){return AddressBookWS._staticInstance._succeeded;}
AddressBookWS.set_defaultFailedCallback=function(value){AddressBookWS._staticInstance._failed=value;}
AddressBookWS.get_defaultFailedCallback=function(){return AddressBookWS._staticInstance._failed;}
AddressBookWS.set_path("/AddressBookWS.asmx");
AddressBookWS.Delete=function(contactId,moduleId,userGuid,onSuccess,onFailed,userContext){AddressBookWS._staticInstance.Delete(contactId,moduleId,userGuid,onSuccess,onFailed,userContext);}
AddressBookWS.GetContactById=function(contactId,moduleId,userGuid,onSuccess,onFailed,userContext){AddressBookWS._staticInstance.GetContactById(contactId,moduleId,userGuid,onSuccess,onFailed,userContext);}
AddressBookWS.Save2=function(id,firstName,lastName,address,email,msn,yahoo,homePhone,officePhone,cellPhone,moduleId,userGuid,onSuccess,onFailed,userContext){AddressBookWS._staticInstance.Save2(id,firstName,lastName,address,email,msn,yahoo,homePhone,officePhone,cellPhone,moduleId,userGuid,onSuccess,onFailed,userContext);}
AddressBookWS.Save=function(id,firstName,lastName,address,email,msn,yahoo,homePhone,officePhone,cellPhone,moduleId,userGuid,onSuccess,onFailed,userContext){AddressBookWS._staticInstance.Save(id,firstName,lastName,address,email,msn,yahoo,homePhone,officePhone,cellPhone,moduleId,userGuid,onSuccess,onFailed,userContext);}
AddressBookWS.Search=function(fieldName,key,moduleId,userGuid,maxHeight,onSuccess,onFailed,userContext){AddressBookWS._staticInstance.Search(fieldName,key,moduleId,userGuid,maxHeight,onSuccess,onFailed,userContext);}
AddressBookWS.GetContactAddress=function(moduleID,onSuccess,onFailed,userContext){AddressBookWS._staticInstance.GetContactAddress(moduleID,onSuccess,onFailed,userContext);}
AddressBookWS.GetContactsByIndex=function(index,moduleId,userGuid,maxHeight,onSuccess,onFailed,userContext){AddressBookWS._staticInstance.GetContactsByIndex(index,moduleId,userGuid,maxHeight,onSuccess,onFailed,userContext);}
AddressBookWS.GetLastFiveEntry=function(moduleId,userGuid,maxHeight,onSuccess,onFailed,userContext){AddressBookWS._staticInstance.GetLastFiveEntry(moduleId,userGuid,maxHeight,onSuccess,onFailed,userContext);}
AddressBookWS.GetIndexLinks=function(moduleId,userGuid,onSuccess,onFailed,userContext){AddressBookWS._staticInstance.GetIndexLinks(moduleId,userGuid,onSuccess,onFailed,userContext);}
AddressBookWS.Export=function(flakeId,userName,profile,onSuccess,onFailed,userContext){AddressBookWS._staticInstance.Export(flakeId,userName,profile,onSuccess,onFailed,userContext);}
AddressBookWS.Import=function(flakeId,userName,profile,data,onSuccess,onFailed,userContext){AddressBookWS._staticInstance.Import(flakeId,userName,profile,data,onSuccess,onFailed,userContext);}
var gtc=Sys.Net.WebServiceProxy._generateTypedConstructor;
if(typeof(ContactAddress)==='undefined'){
var ContactAddress=gtc("ContactAddress");
ContactAddress.registerClass('ContactAddress');}
var AlertService=function(){
AlertService.initializeBase(this);
this._timeout=0;
this._userContext=null;
this._succeeded=null;
this._failed=null;}
AlertService.prototype={
GetPendingAlerts:function(succeededCallback,failedCallback,userContext){
return this._invoke(AlertService.get_path(),'GetPendingAlerts',true,{},succeededCallback,failedCallback,userContext);},
HideAlert:function(alertID,succeededCallback,failedCallback,userContext){
return this._invoke(AlertService.get_path(),'HideAlert',true,{alertID:alertID},succeededCallback,failedCallback,userContext);}}
AlertService.registerClass('AlertService',Sys.Net.WebServiceProxy);
AlertService._staticInstance=new AlertService();
AlertService.set_path=function(value){AlertService._staticInstance._path=value;}
AlertService.get_path=function(){return AlertService._staticInstance._path;}
AlertService.set_timeout=function(value){AlertService._staticInstance._timeout=value;}
AlertService.get_timeout=function(){return AlertService._staticInstance._timeout;}
AlertService.set_defaultUserContext=function(value){AlertService._staticInstance._userContext=value;}
AlertService.get_defaultUserContext=function(){return AlertService._staticInstance._userContext;}
AlertService.set_defaultSucceededCallback=function(value){AlertService._staticInstance._succeeded=value;}
AlertService.get_defaultSucceededCallback=function(){return AlertService._staticInstance._succeeded;}
AlertService.set_defaultFailedCallback=function(value){AlertService._staticInstance._failed=value;}
AlertService.get_defaultFailedCallback=function(){return AlertService._staticInstance._failed;}
AlertService.set_path("/AlertService.asmx");
AlertService.GetPendingAlerts=function(onSuccess,onFailed,userContext){AlertService._staticInstance.GetPendingAlerts(onSuccess,onFailed,userContext);}
AlertService.HideAlert=function(alertID,onSuccess,onFailed,userContext){AlertService._staticInstance.HideAlert(alertID,onSuccess,onFailed,userContext);}
var gtc=Sys.Net.WebServiceProxy._generateTypedConstructor;
if(typeof(AlertService_AlertObject)==='undefined'){
var AlertService_AlertObject=gtc("AlertService+AlertObject");
AlertService_AlertObject.registerClass('AlertService_AlertObject');}
var ContentProxy=function(){
ContentProxy.initializeBase(this);
this._timeout=0;
this._userContext=null;
this._succeeded=null;
this._failed=null;}
ContentProxy.prototype={
GetUrl3:function(url,headers,cookies,succeededCallback,failedCallback,userContext){
return this._invoke(ContentProxy.get_path(),'GetUrl3',true,{url:url,headers:headers,cookies:cookies},succeededCallback,failedCallback,userContext);},
GetUrl2:function(url,headers,succeededCallback,failedCallback,userContext){
return this._invoke(ContentProxy.get_path(),'GetUrl2',true,{url:url,headers:headers},succeededCallback,failedCallback,userContext);},
GetUrl1:function(url,cacheDurationInMinute,succeededCallback,failedCallback,userContext){
return this._invoke(ContentProxy.get_path(),'GetUrl1',true,{url:url,cacheDurationInMinute:cacheDurationInMinute},succeededCallback,failedCallback,userContext);},
GetUrl:function(url,succeededCallback,failedCallback,userContext){
return this._invoke(ContentProxy.get_path(),'GetUrl',true,{url:url},succeededCallback,failedCallback,userContext);},
GetUrlNonCached:function(url,succeededCallback,failedCallback,userContext){
return this._invoke(ContentProxy.get_path(),'GetUrlNonCached',true,{url:url},succeededCallback,failedCallback,userContext);},
GetUrlNonCached2:function(url,headers,cookies,succeededCallback,failedCallback,userContext){
return this._invoke(ContentProxy.get_path(),'GetUrlNonCached2',true,{url:url,headers:headers,cookies:cookies},succeededCallback,failedCallback,userContext);},
GetXml:function(url,succeededCallback,failedCallback,userContext){
return this._invoke(ContentProxy.get_path(),'GetXml',true,{url:url},succeededCallback,failedCallback,userContext);},
FormPost3:function(url,parameters,headers,cookies,succeededCallback,failedCallback,userContext){
return this._invoke(ContentProxy.get_path(),'FormPost3',false,{url:url,parameters:parameters,headers:headers,cookies:cookies},succeededCallback,failedCallback,userContext);},
FormPost2:function(url,parameters,headers,succeededCallback,failedCallback,userContext){
return this._invoke(ContentProxy.get_path(),'FormPost2',false,{url:url,parameters:parameters,headers:headers},succeededCallback,failedCallback,userContext);},
FormPost:function(url,parameters,succeededCallback,failedCallback,userContext){
return this._invoke(ContentProxy.get_path(),'FormPost',false,{url:url,parameters:parameters},succeededCallback,failedCallback,userContext);},
UploadString:function(url,requestData,succeededCallback,failedCallback,userContext){
return this._invoke(ContentProxy.get_path(),'UploadString',false,{url:url,requestData:requestData},succeededCallback,failedCallback,userContext);},
UploadString2:function(url,headers,requestData,succeededCallback,failedCallback,userContext){
return this._invoke(ContentProxy.get_path(),'UploadString2',false,{url:url,headers:headers,requestData:requestData},succeededCallback,failedCallback,userContext);}}
ContentProxy.registerClass('ContentProxy',Sys.Net.WebServiceProxy);
ContentProxy._staticInstance=new ContentProxy();
ContentProxy.set_path=function(value){ContentProxy._staticInstance._path=value;}
ContentProxy.get_path=function(){return ContentProxy._staticInstance._path;}
ContentProxy.set_timeout=function(value){ContentProxy._staticInstance._timeout=value;}
ContentProxy.get_timeout=function(){return ContentProxy._staticInstance._timeout;}
ContentProxy.set_defaultUserContext=function(value){ContentProxy._staticInstance._userContext=value;}
ContentProxy.get_defaultUserContext=function(){return ContentProxy._staticInstance._userContext;}
ContentProxy.set_defaultSucceededCallback=function(value){ContentProxy._staticInstance._succeeded=value;}
ContentProxy.get_defaultSucceededCallback=function(){return ContentProxy._staticInstance._succeeded;}
ContentProxy.set_defaultFailedCallback=function(value){ContentProxy._staticInstance._failed=value;}
ContentProxy.get_defaultFailedCallback=function(){return ContentProxy._staticInstance._failed;}
ContentProxy.set_path("/ContentProxy.asmx");
ContentProxy.GetUrl3=function(url,headers,cookies,onSuccess,onFailed,userContext){ContentProxy._staticInstance.GetUrl3(url,headers,cookies,onSuccess,onFailed,userContext);}
ContentProxy.GetUrl2=function(url,headers,onSuccess,onFailed,userContext){ContentProxy._staticInstance.GetUrl2(url,headers,onSuccess,onFailed,userContext);}
ContentProxy.GetUrl1=function(url,cacheDurationInMinute,onSuccess,onFailed,userContext){ContentProxy._staticInstance.GetUrl1(url,cacheDurationInMinute,onSuccess,onFailed,userContext);}
ContentProxy.GetUrl=function(url,onSuccess,onFailed,userContext){ContentProxy._staticInstance.GetUrl(url,onSuccess,onFailed,userContext);}
ContentProxy.GetUrlNonCached=function(url,onSuccess,onFailed,userContext){ContentProxy._staticInstance.GetUrlNonCached(url,onSuccess,onFailed,userContext);}
ContentProxy.GetUrlNonCached2=function(url,headers,cookies,onSuccess,onFailed,userContext){ContentProxy._staticInstance.GetUrlNonCached2(url,headers,cookies,onSuccess,onFailed,userContext);}
ContentProxy.GetXml=function(url,onSuccess,onFailed,userContext){ContentProxy._staticInstance.GetXml(url,onSuccess,onFailed,userContext);}
ContentProxy.FormPost3=function(url,parameters,headers,cookies,onSuccess,onFailed,userContext){ContentProxy._staticInstance.FormPost3(url,parameters,headers,cookies,onSuccess,onFailed,userContext);}
ContentProxy.FormPost2=function(url,parameters,headers,onSuccess,onFailed,userContext){ContentProxy._staticInstance.FormPost2(url,parameters,headers,onSuccess,onFailed,userContext);}
ContentProxy.FormPost=function(url,parameters,onSuccess,onFailed,userContext){ContentProxy._staticInstance.FormPost(url,parameters,onSuccess,onFailed,userContext);}
ContentProxy.UploadString=function(url,requestData,onSuccess,onFailed,userContext){ContentProxy._staticInstance.UploadString(url,requestData,onSuccess,onFailed,userContext);}
ContentProxy.UploadString2=function(url,headers,requestData,onSuccess,onFailed,userContext){ContentProxy._staticInstance.UploadString2(url,headers,requestData,onSuccess,onFailed,userContext);}
var gtc=Sys.Net.WebServiceProxy._generateTypedConstructor;
if(typeof(ContentProxyResponse)==='undefined'){
var ContentProxyResponse=gtc("ContentProxyResponse");
ContentProxyResponse.registerClass('ContentProxyResponse');}
var CoreServices=function(){
CoreServices.initializeBase(this);
this._timeout=0;
this._userContext=null;
this._succeeded=null;
this._failed=null;}
CoreServices.prototype={
GetUserEmail:function(succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetUserEmail',true,{},succeededCallback,failedCallback,userContext);},
DeleteProfilePhoto:function(succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'DeleteProfilePhoto',true,{},succeededCallback,failedCallback,userContext);},
GetPublicUrlInfo:function(succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetPublicUrlInfo',true,{},succeededCallback,failedCallback,userContext);},
GetPublicProfile:function(succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetPublicProfile',true,{},succeededCallback,failedCallback,userContext);},
GetUserProfile:function(succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetUserProfile',true,{},succeededCallback,failedCallback,userContext);},
SavePublicProfile:function(profileData,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'SavePublicProfile',true,{profileData:profileData},succeededCallback,failedCallback,userContext);},
SaveUserProfile:function(profileString,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'SaveUserProfile',true,{profileString:profileString},succeededCallback,failedCallback,userContext);},
SetupPage:function(setupInfo,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'SetupPage',true,{setupInfo:setupInfo},succeededCallback,failedCallback,userContext);},
GetPageflake:function(source,pageID,userUniqueName,themeName,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetPageflake',true,{source:source,pageID:pageID,userUniqueName:userUniqueName,themeName:themeName},succeededCallback,failedCallback,userContext);},
GetPassword:function(email,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetPassword',true,{email:email},succeededCallback,failedCallback,userContext);},
GetPageModules:function(pageId,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetPageModules',true,{pageId:pageId},succeededCallback,failedCallback,userContext);},
Login:function(username,password,rememberme,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'Login',false,{username:username,password:password,rememberme:rememberme},succeededCallback,failedCallback,userContext);},
GetPageVersionNo:function(pageId,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetPageVersionNo',true,{pageId:pageId},succeededCallback,failedCallback,userContext);},
GetPageContent:function(userGuid,pageId,versionNo,siteVersion,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetPageContent',true,{userGuid:userGuid,pageId:pageId,versionNo:versionNo,siteVersion:siteVersion},succeededCallback,failedCallback,userContext);},
GetPages:function(pageInfos,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetPages',false,{pageInfos:pageInfos},succeededCallback,failedCallback,userContext);},
SavePage:function(pageData,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'SavePage',false,{pageData:pageData},succeededCallback,failedCallback,userContext);},
RemovePage:function(pageId,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'RemovePage',true,{pageId:pageId},succeededCallback,failedCallback,userContext);},
GetModules:function(pageId,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetModules',true,{pageId:pageId},succeededCallback,failedCallback,userContext);},
SaveLayout:function(pageProperties,modules,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'SaveLayout',false,{pageProperties:pageProperties,modules:modules},succeededCallback,failedCallback,userContext);},
SavePageOrder:function(pageOrders,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'SavePageOrder',false,{pageOrders:pageOrders},succeededCallback,failedCallback,userContext);},
SetCurrentPage:function(pageId,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'SetCurrentPage',true,{pageId:pageId},succeededCallback,failedCallback,userContext);},
GetPage:function(id,url,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetPage',true,{id:id,url:url},succeededCallback,failedCallback,userContext);},
GetModule:function(instanceId,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetModule',true,{instanceId:instanceId},succeededCallback,failedCallback,userContext);},
SaveModule:function(pageId,moduleProperties,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'SaveModule',false,{pageId:pageId,moduleProperties:moduleProperties},succeededCallback,failedCallback,userContext);},
RemoveModule:function(id,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'RemoveModule',true,{id:id},succeededCallback,failedCallback,userContext);},
MoveModuleToPage:function(moduleId,fromPageId,toPageId,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'MoveModuleToPage',true,{moduleId:moduleId,fromPageId:fromPageId,toPageId:toPageId},succeededCallback,failedCallback,userContext);},
CreateNewModule:function(title,url,pageID,row,col,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'CreateNewModule',true,{title:title,url:url,pageID:pageID,row:row,col:col},succeededCallback,failedCallback,userContext);},
GetSharedUserNames:function(pageId,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetSharedUserNames',true,{pageId:pageId},succeededCallback,failedCallback,userContext);},
GetPublishedPage:function(pageId,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetPublishedPage',true,{pageId:pageId},succeededCallback,failedCallback,userContext);},
PublishPage:function(pageId,title,description,tags,emailAddresses,allowEdit,publishInCommunity,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'PublishPage',true,{pageId:pageId,title:title,description:description,tags:tags,emailAddresses:emailAddresses,allowEdit:allowEdit,publishInCommunity:publishInCommunity},succeededCallback,failedCallback,userContext);},
GetPageUrl:function(pageId,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetPageUrl',true,{pageId:pageId},succeededCallback,failedCallback,userContext);},
PublishInCommunity:function(pageId,description,tags,title,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'PublishInCommunity',true,{pageId:pageId,description:description,tags:tags,title:title},succeededCallback,failedCallback,userContext);},
CreateCopyOfPage:function(pageId,pageOf,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'CreateCopyOfPage',true,{pageId:pageId,pageOf:pageOf},succeededCallback,failedCallback,userContext);},
GetRandomPageUrlFromRepository:function(succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetRandomPageUrlFromRepository',true,{},succeededCallback,failedCallback,userContext);},
UnpublishPage:function(pageId,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'UnpublishPage',true,{pageId:pageId},succeededCallback,failedCallback,userContext);},
SharePage:function(pageId,emailAddresses,allowEdit,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'SharePage',false,{pageId:pageId,emailAddresses:emailAddresses,allowEdit:allowEdit},succeededCallback,failedCallback,userContext);},
PublishPageInvite:function(pageId,emailAddresses,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'PublishPageInvite',false,{pageId:pageId,emailAddresses:emailAddresses},succeededCallback,failedCallback,userContext);},
MakePrivate:function(pageId,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'MakePrivate',true,{pageId:pageId},succeededCallback,failedCallback,userContext);},
SetSharedUsers:function(pageId,email,allowEdit,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'SetSharedUsers',true,{pageId:pageId,email:email,allowEdit:allowEdit},succeededCallback,failedCallback,userContext);},
UnsharePage:function(pageId,email,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'UnsharePage',true,{pageId:pageId,email:email},succeededCallback,failedCallback,userContext);},
GetSharedPagesWithMe:function(succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetSharedPagesWithMe',true,{},succeededCallback,failedCallback,userContext);},
ApproveOrRejectSharedPage:function(pageId,approve,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'ApproveOrRejectSharedPage',true,{pageId:pageId,approve:approve},succeededCallback,failedCallback,userContext);},
GetUserProfileId:function(pageId,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetUserProfileId',true,{pageId:pageId},succeededCallback,failedCallback,userContext);},
BookmarkPageForUser:function(pageId,pageOf,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'BookmarkPageForUser',true,{pageId:pageId,pageOf:pageOf},succeededCallback,failedCallback,userContext);},
Discover:function(url,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'Discover',true,{url:url},succeededCallback,failedCallback,userContext);},
GetAddFeedPopup:function(version,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetAddFeedPopup',true,{version:version},succeededCallback,failedCallback,userContext);},
GetPageSettingsPopup:function(version,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetPageSettingsPopup',true,{version:version},succeededCallback,failedCallback,userContext);},
GetHtmlViewer:function(url,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetHtmlViewer',true,{url:url},succeededCallback,failedCallback,userContext);},
GetTemplate:function(name,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetTemplate',true,{name:name},succeededCallback,failedCallback,userContext);},
ErrorReports:function(errors,logs,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'ErrorReports',false,{errors:errors,logs:logs},succeededCallback,failedCallback,userContext);},
SendFeedback:function(feedback,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'SendFeedback',false,{feedback:feedback},succeededCallback,failedCallback,userContext);},
SendEmails:function(fromName,toNames,subject,emailTemplateName,mailFormat,templateParameters,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'SendEmails',false,{fromName:fromName,toNames:toNames,subject:subject,emailTemplateName:emailTemplateName,mailFormat:mailFormat,templateParameters:templateParameters},succeededCallback,failedCallback,userContext);},
SendEmail:function(fromName,toName,subject,emailTemplateName,mailFormat,templateParameters,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'SendEmail',false,{fromName:fromName,toName:toName,subject:subject,emailTemplateName:emailTemplateName,mailFormat:mailFormat,templateParameters:templateParameters},succeededCallback,failedCallback,userContext);},
SendEmail2:function(fromName,toName,ccName,subject,emailTemplateName,mailFormat,templateParameters,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'SendEmail2',false,{fromName:fromName,toName:toName,ccName:ccName,subject:subject,emailTemplateName:emailTemplateName,mailFormat:mailFormat,templateParameters:templateParameters},succeededCallback,failedCallback,userContext);},
DeleteAllBookmark:function(succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'DeleteAllBookmark',true,{},succeededCallback,failedCallback,userContext);},
DeleteBookmark:function(bookmarkId,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'DeleteBookmark',true,{bookmarkId:bookmarkId},succeededCallback,failedCallback,userContext);},
AddBookmark:function(title,url,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'AddBookmark',true,{title:title,url:url},succeededCallback,failedCallback,userContext);},
GetAllBookmarksHtml:function(succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetAllBookmarksHtml',true,{},succeededCallback,failedCallback,userContext);},
GetFlakesGrid:function(version,loadAllFlakes,language,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetFlakesGrid',true,{version:version,loadAllFlakes:loadAllFlakes,language:language},succeededCallback,failedCallback,userContext);},
SaveProfile:function(name,value,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'SaveProfile',true,{name:name,value:value},succeededCallback,failedCallback,userContext);},
SaveUserInfo:function(properties,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'SaveUserInfo',false,{properties:properties},succeededCallback,failedCallback,userContext);},
ChangePassword:function(oldPassword,newPassword,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'ChangePassword',true,{oldPassword:oldPassword,newPassword:newPassword},succeededCallback,failedCallback,userContext);},
UsernameAvailable:function(uniquename,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'UsernameAvailable',true,{uniquename:uniquename},succeededCallback,failedCallback,userContext);},
ValidateUniqename:function(uniqueName,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'ValidateUniqename',true,{uniqueName:uniqueName},succeededCallback,failedCallback,userContext);},
ChangeUniqueName:function(uniqueName,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'ChangeUniqueName',true,{uniqueName:uniqueName},succeededCallback,failedCallback,userContext);},
AddReminder:function(to,from,cc,subject,templateName,htmlFormat,templateParameters,reminderTime,timeZoneId,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'AddReminder',false,{to:to,from:from,cc:cc,subject:subject,templateName:templateName,htmlFormat:htmlFormat,templateParameters:templateParameters,reminderTime:reminderTime,timeZoneId:timeZoneId},succeededCallback,failedCallback,userContext);},
RemoveReminder:function(guid,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'RemoveReminder',false,{guid:guid},succeededCallback,failedCallback,userContext);},
MatchLocation:function(location,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'MatchLocation',true,{location:location},succeededCallback,failedCallback,userContext);},
GetLocationDetailByIPAddress:function(succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetLocationDetailByIPAddress',true,{},succeededCallback,failedCallback,userContext);},
SendPublicPageInvitation:function(pageId,recipients,message,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'SendPublicPageInvitation',false,{pageId:pageId,recipients:recipients,message:message},succeededCallback,failedCallback,userContext);},
ImportContacts:function(accountType,userName,password,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'ImportContacts',true,{accountType:accountType,userName:userName,password:password},succeededCallback,failedCallback,userContext);},
GetTooltips:function(succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetTooltips',true,{},succeededCallback,failedCallback,userContext);},
SendThisPageToFriend:function(pageId,recipients,message,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'SendThisPageToFriend',true,{pageId:pageId,recipients:recipients,message:message},succeededCallback,failedCallback,userContext);},
SendThisFlakeToFriend:function(flakeId,recipients,message,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'SendThisFlakeToFriend',true,{flakeId:flakeId,recipients:recipients,message:message},succeededCallback,failedCallback,userContext);},
ResendVerificationEmail:function(succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'ResendVerificationEmail',true,{},succeededCallback,failedCallback,userContext);},
CanSendVerificationEmail:function(succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'CanSendVerificationEmail',true,{},succeededCallback,failedCallback,userContext);},
IsUserRequiredToVerifyEmail:function(succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'IsUserRequiredToVerifyEmail',true,{},succeededCallback,failedCallback,userContext);},
GetZipCodes:function(city,state,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetZipCodes',true,{city:city,state:state},succeededCallback,failedCallback,userContext);},
GetZipCode:function(city,state,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetZipCode',true,{city:city,state:state},succeededCallback,failedCallback,userContext);},
GetThemesOfUser:function(succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'GetThemesOfUser',true,{},succeededCallback,failedCallback,userContext);},
CreateCustomTheme:function(succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'CreateCustomTheme',true,{},succeededCallback,failedCallback,userContext);},
DeleteCustomTheme:function(customThemeId,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'DeleteCustomTheme',true,{customThemeId:customThemeId},succeededCallback,failedCallback,userContext);},
ChangeCustomTheme:function(customThemeId,properties,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'ChangeCustomTheme',false,{customThemeId:customThemeId,properties:properties},succeededCallback,failedCallback,userContext);},
SendTheme:function(themeName,customThemeId,succeededCallback,failedCallback,userContext){
return this._invoke(CoreServices.get_path(),'SendTheme',false,{themeName:themeName,customThemeId:customThemeId},succeededCallback,failedCallback,userContext);}}
CoreServices.registerClass('CoreServices',Sys.Net.WebServiceProxy);
CoreServices._staticInstance=new CoreServices();
CoreServices.set_path=function(value){CoreServices._staticInstance._path=value;}
CoreServices.get_path=function(){return CoreServices._staticInstance._path;}
CoreServices.set_timeout=function(value){CoreServices._staticInstance._timeout=value;}
CoreServices.get_timeout=function(){return CoreServices._staticInstance._timeout;}
CoreServices.set_defaultUserContext=function(value){CoreServices._staticInstance._userContext=value;}
CoreServices.get_defaultUserContext=function(){return CoreServices._staticInstance._userContext;}
CoreServices.set_defaultSucceededCallback=function(value){CoreServices._staticInstance._succeeded=value;}
CoreServices.get_defaultSucceededCallback=function(){return CoreServices._staticInstance._succeeded;}
CoreServices.set_defaultFailedCallback=function(value){CoreServices._staticInstance._failed=value;}
CoreServices.get_defaultFailedCallback=function(){return CoreServices._staticInstance._failed;}
CoreServices.set_path("/CoreServices.asmx");
CoreServices.GetUserEmail=function(onSuccess,onFailed,userContext){CoreServices._staticInstance.GetUserEmail(onSuccess,onFailed,userContext);}
CoreServices.DeleteProfilePhoto=function(onSuccess,onFailed,userContext){CoreServices._staticInstance.DeleteProfilePhoto(onSuccess,onFailed,userContext);}
CoreServices.GetPublicUrlInfo=function(onSuccess,onFailed,userContext){CoreServices._staticInstance.GetPublicUrlInfo(onSuccess,onFailed,userContext);}
CoreServices.GetPublicProfile=function(onSuccess,onFailed,userContext){CoreServices._staticInstance.GetPublicProfile(onSuccess,onFailed,userContext);}
CoreServices.GetUserProfile=function(onSuccess,onFailed,userContext){CoreServices._staticInstance.GetUserProfile(onSuccess,onFailed,userContext);}
CoreServices.SavePublicProfile=function(profileData,onSuccess,onFailed,userContext){CoreServices._staticInstance.SavePublicProfile(profileData,onSuccess,onFailed,userContext);}
CoreServices.SaveUserProfile=function(profileString,onSuccess,onFailed,userContext){CoreServices._staticInstance.SaveUserProfile(profileString,onSuccess,onFailed,userContext);}
CoreServices.SetupPage=function(setupInfo,onSuccess,onFailed,userContext){CoreServices._staticInstance.SetupPage(setupInfo,onSuccess,onFailed,userContext);}
CoreServices.GetPageflake=function(source,pageID,userUniqueName,themeName,onSuccess,onFailed,userContext){CoreServices._staticInstance.GetPageflake(source,pageID,userUniqueName,themeName,onSuccess,onFailed,userContext);}
CoreServices.GetPassword=function(email,onSuccess,onFailed,userContext){CoreServices._staticInstance.GetPassword(email,onSuccess,onFailed,userContext);}
CoreServices.GetPageModules=function(pageId,onSuccess,onFailed,userContext){CoreServices._staticInstance.GetPageModules(pageId,onSuccess,onFailed,userContext);}
CoreServices.Login=function(username,password,rememberme,onSuccess,onFailed,userContext){CoreServices._staticInstance.Login(username,password,rememberme,onSuccess,onFailed,userContext);}
CoreServices.GetPageVersionNo=function(pageId,onSuccess,onFailed,userContext){CoreServices._staticInstance.GetPageVersionNo(pageId,onSuccess,onFailed,userContext);}
CoreServices.GetPageContent=function(userGuid,pageId,versionNo,siteVersion,onSuccess,onFailed,userContext){CoreServices._staticInstance.GetPageContent(userGuid,pageId,versionNo,siteVersion,onSuccess,onFailed,userContext);}
CoreServices.GetPages=function(pageInfos,onSuccess,onFailed,userContext){CoreServices._staticInstance.GetPages(pageInfos,onSuccess,onFailed,userContext);}
CoreServices.SavePage=function(pageData,onSuccess,onFailed,userContext){CoreServices._staticInstance.SavePage(pageData,onSuccess,onFailed,userContext);}
CoreServices.RemovePage=function(pageId,onSuccess,onFailed,userContext){CoreServices._staticInstance.RemovePage(pageId,onSuccess,onFailed,userContext);}
CoreServices.GetModules=function(pageId,onSuccess,onFailed,userContext){CoreServices._staticInstance.GetModules(pageId,onSuccess,onFailed,userContext);}
CoreServices.SaveLayout=function(pageProperties,modules,onSuccess,onFailed,userContext){CoreServices._staticInstance.SaveLayout(pageProperties,modules,onSuccess,onFailed,userContext);}
CoreServices.SavePageOrder=function(pageOrders,onSuccess,onFailed,userContext){CoreServices._staticInstance.SavePageOrder(pageOrders,onSuccess,onFailed,userContext);}
CoreServices.SetCurrentPage=function(pageId,onSuccess,onFailed,userContext){CoreServices._staticInstance.SetCurrentPage(pageId,onSuccess,onFailed,userContext);}
CoreServices.GetPage=function(id,url,onSuccess,onFailed,userContext){CoreServices._staticInstance.GetPage(id,url,onSuccess,onFailed,userContext);}
CoreServices.GetModule=function(instanceId,onSuccess,onFailed,userContext){CoreServices._staticInstance.GetModule(instanceId,onSuccess,onFailed,userContext);}
CoreServices.SaveModule=function(pageId,moduleProperties,onSuccess,onFailed,userContext){CoreServices._staticInstance.SaveModule(pageId,moduleProperties,onSuccess,onFailed,userContext);}
CoreServices.RemoveModule=function(id,onSuccess,onFailed,userContext){CoreServices._staticInstance.RemoveModule(id,onSuccess,onFailed,userContext);}
CoreServices.MoveModuleToPage=function(moduleId,fromPageId,toPageId,onSuccess,onFailed,userContext){CoreServices._staticInstance.MoveModuleToPage(moduleId,fromPageId,toPageId,onSuccess,onFailed,userContext);}
CoreServices.CreateNewModule=function(title,url,pageID,row,col,onSuccess,onFailed,userContext){CoreServices._staticInstance.CreateNewModule(title,url,pageID,row,col,onSuccess,onFailed,userContext);}
CoreServices.GetSharedUserNames=function(pageId,onSuccess,onFailed,userContext){CoreServices._staticInstance.GetSharedUserNames(pageId,onSuccess,onFailed,userContext);}
CoreServices.GetPublishedPage=function(pageId,onSuccess,onFailed,userContext){CoreServices._staticInstance.GetPublishedPage(pageId,onSuccess,onFailed,userContext);}
CoreServices.PublishPage=function(pageId,title,description,tags,emailAddresses,allowEdit,publishInCommunity,onSuccess,onFailed,userContext){CoreServices._staticInstance.PublishPage(pageId,title,description,tags,emailAddresses,allowEdit,publishInCommunity,onSuccess,onFailed,userContext);}
CoreServices.GetPageUrl=function(pageId,onSuccess,onFailed,userContext){CoreServices._staticInstance.GetPageUrl(pageId,onSuccess,onFailed,userContext);}
CoreServices.PublishInCommunity=function(pageId,description,tags,title,onSuccess,onFailed,userContext){CoreServices._staticInstance.PublishInCommunity(pageId,description,tags,title,onSuccess,onFailed,userContext);}
CoreServices.CreateCopyOfPage=function(pageId,pageOf,onSuccess,onFailed,userContext){CoreServices._staticInstance.CreateCopyOfPage(pageId,pageOf,onSuccess,onFailed,userContext);}
CoreServices.GetRandomPageUrlFromRepository=function(onSuccess,onFailed,userContext){CoreServices._staticInstance.GetRandomPageUrlFromRepository(onSuccess,onFailed,userContext);}
CoreServices.UnpublishPage=function(pageId,onSuccess,onFailed,userContext){CoreServices._staticInstance.UnpublishPage(pageId,onSuccess,onFailed,userContext);}
CoreServices.SharePage=function(pageId,emailAddresses,allowEdit,onSuccess,onFailed,userContext){CoreServices._staticInstance.SharePage(pageId,emailAddresses,allowEdit,onSuccess,onFailed,userContext);}
CoreServices.PublishPageInvite=function(pageId,emailAddresses,onSuccess,onFailed,userContext){CoreServices._staticInstance.PublishPageInvite(pageId,emailAddresses,onSuccess,onFailed,userContext);}
CoreServices.MakePrivate=function(pageId,onSuccess,onFailed,userContext){CoreServices._staticInstance.MakePrivate(pageId,onSuccess,onFailed,userContext);}
CoreServices.SetSharedUsers=function(pageId,email,allowEdit,onSuccess,onFailed,userContext){CoreServices._staticInstance.SetSharedUsers(pageId,email,allowEdit,onSuccess,onFailed,userContext);}
CoreServices.UnsharePage=function(pageId,email,onSuccess,onFailed,userContext){CoreServices._staticInstance.UnsharePage(pageId,email,onSuccess,onFailed,userContext);}
CoreServices.GetSharedPagesWithMe=function(onSuccess,onFailed,userContext){CoreServices._staticInstance.GetSharedPagesWithMe(onSuccess,onFailed,userContext);}
CoreServices.ApproveOrRejectSharedPage=function(pageId,approve,onSuccess,onFailed,userContext){CoreServices._staticInstance.ApproveOrRejectSharedPage(pageId,approve,onSuccess,onFailed,userContext);}
CoreServices.GetUserProfileId=function(pageId,onSuccess,onFailed,userContext){CoreServices._staticInstance.GetUserProfileId(pageId,onSuccess,onFailed,userContext);}
CoreServices.BookmarkPageForUser=function(pageId,pageOf,onSuccess,onFailed,userContext){CoreServices._staticInstance.BookmarkPageForUser(pageId,pageOf,onSuccess,onFailed,userContext);}
CoreServices.Discover=function(url,onSuccess,onFailed,userContext){CoreServices._staticInstance.Discover(url,onSuccess,onFailed,userContext);}
CoreServices.GetAddFeedPopup=function(version,onSuccess,onFailed,userContext){CoreServices._staticInstance.GetAddFeedPopup(version,onSuccess,onFailed,userContext);}
CoreServices.GetPageSettingsPopup=function(version,onSuccess,onFailed,userContext){CoreServices._staticInstance.GetPageSettingsPopup(version,onSuccess,onFailed,userContext);}
CoreServices.GetHtmlViewer=function(url,onSuccess,onFailed,userContext){CoreServices._staticInstance.GetHtmlViewer(url,onSuccess,onFailed,userContext);}
CoreServices.GetTemplate=function(name,onSuccess,onFailed,userContext){CoreServices._staticInstance.GetTemplate(name,onSuccess,onFailed,userContext);}
CoreServices.ErrorReports=function(errors,logs,onSuccess,onFailed,userContext){CoreServices._staticInstance.ErrorReports(errors,logs,onSuccess,onFailed,userContext);}
CoreServices.SendFeedback=function(feedback,onSuccess,onFailed,userContext){CoreServices._staticInstance.SendFeedback(feedback,onSuccess,onFailed,userContext);}
CoreServices.SendEmails=function(fromName,toNames,subject,emailTemplateName,mailFormat,templateParameters,onSuccess,onFailed,userContext){CoreServices._staticInstance.SendEmails(fromName,toNames,subject,emailTemplateName,mailFormat,templateParameters,onSuccess,onFailed,userContext);}
CoreServices.SendEmail=function(fromName,toName,subject,emailTemplateName,mailFormat,templateParameters,onSuccess,onFailed,userContext){CoreServices._staticInstance.SendEmail(fromName,toName,subject,emailTemplateName,mailFormat,templateParameters,onSuccess,onFailed,userContext);}
CoreServices.SendEmail2=function(fromName,toName,ccName,subject,emailTemplateName,mailFormat,templateParameters,onSuccess,onFailed,userContext){CoreServices._staticInstance.SendEmail2(fromName,toName,ccName,subject,emailTemplateName,mailFormat,templateParameters,onSuccess,onFailed,userContext);}
CoreServices.DeleteAllBookmark=function(onSuccess,onFailed,userContext){CoreServices._staticInstance.DeleteAllBookmark(onSuccess,onFailed,userContext);}
CoreServices.DeleteBookmark=function(bookmarkId,onSuccess,onFailed,userContext){CoreServices._staticInstance.DeleteBookmark(bookmarkId,onSuccess,onFailed,userContext);}
CoreServices.AddBookmark=function(title,url,onSuccess,onFailed,userContext){CoreServices._staticInstance.AddBookmark(title,url,onSuccess,onFailed,userContext);}
CoreServices.GetAllBookmarksHtml=function(onSuccess,onFailed,userContext){CoreServices._staticInstance.GetAllBookmarksHtml(onSuccess,onFailed,userContext);}
CoreServices.GetFlakesGrid=function(version,loadAllFlakes,language,onSuccess,onFailed,userContext){CoreServices._staticInstance.GetFlakesGrid(version,loadAllFlakes,language,onSuccess,onFailed,userContext);}
CoreServices.SaveProfile=function(name,value,onSuccess,onFailed,userContext){CoreServices._staticInstance.SaveProfile(name,value,onSuccess,onFailed,userContext);}
CoreServices.SaveUserInfo=function(properties,onSuccess,onFailed,userContext){CoreServices._staticInstance.SaveUserInfo(properties,onSuccess,onFailed,userContext);}
CoreServices.ChangePassword=function(oldPassword,newPassword,onSuccess,onFailed,userContext){CoreServices._staticInstance.ChangePassword(oldPassword,newPassword,onSuccess,onFailed,userContext);}
CoreServices.UsernameAvailable=function(uniquename,onSuccess,onFailed,userContext){CoreServices._staticInstance.UsernameAvailable(uniquename,onSuccess,onFailed,userContext);}
CoreServices.ValidateUniqename=function(uniqueName,onSuccess,onFailed,userContext){CoreServices._staticInstance.ValidateUniqename(uniqueName,onSuccess,onFailed,userContext);}
CoreServices.ChangeUniqueName=function(uniqueName,onSuccess,onFailed,userContext){CoreServices._staticInstance.ChangeUniqueName(uniqueName,onSuccess,onFailed,userContext);}
CoreServices.AddReminder=function(to,from,cc,subject,templateName,htmlFormat,templateParameters,reminderTime,timeZoneId,onSuccess,onFailed,userContext){CoreServices._staticInstance.AddReminder(to,from,cc,subject,templateName,htmlFormat,templateParameters,reminderTime,timeZoneId,onSuccess,onFailed,userContext);}
CoreServices.RemoveReminder=function(guid,onSuccess,onFailed,userContext){CoreServices._staticInstance.RemoveReminder(guid,onSuccess,onFailed,userContext);}
CoreServices.MatchLocation=function(location,onSuccess,onFailed,userContext){CoreServices._staticInstance.MatchLocation(location,onSuccess,onFailed,userContext);}
CoreServices.GetLocationDetailByIPAddress=function(onSuccess,onFailed,userContext){CoreServices._staticInstance.GetLocationDetailByIPAddress(onSuccess,onFailed,userContext);}
CoreServices.SendPublicPageInvitation=function(pageId,recipients,message,onSuccess,onFailed,userContext){CoreServices._staticInstance.SendPublicPageInvitation(pageId,recipients,message,onSuccess,onFailed,userContext);}
CoreServices.ImportContacts=function(accountType,userName,password,onSuccess,onFailed,userContext){CoreServices._staticInstance.ImportContacts(accountType,userName,password,onSuccess,onFailed,userContext);}
CoreServices.GetTooltips=function(onSuccess,onFailed,userContext){CoreServices._staticInstance.GetTooltips(onSuccess,onFailed,userContext);}
CoreServices.SendThisPageToFriend=function(pageId,recipients,message,onSuccess,onFailed,userContext){CoreServices._staticInstance.SendThisPageToFriend(pageId,recipients,message,onSuccess,onFailed,userContext);}
CoreServices.SendThisFlakeToFriend=function(flakeId,recipients,message,onSuccess,onFailed,userContext){CoreServices._staticInstance.SendThisFlakeToFriend(flakeId,recipients,message,onSuccess,onFailed,userContext);}
CoreServices.ResendVerificationEmail=function(onSuccess,onFailed,userContext){CoreServices._staticInstance.ResendVerificationEmail(onSuccess,onFailed,userContext);}
CoreServices.CanSendVerificationEmail=function(onSuccess,onFailed,userContext){CoreServices._staticInstance.CanSendVerificationEmail(onSuccess,onFailed,userContext);}
CoreServices.IsUserRequiredToVerifyEmail=function(onSuccess,onFailed,userContext){CoreServices._staticInstance.IsUserRequiredToVerifyEmail(onSuccess,onFailed,userContext);}
CoreServices.GetZipCodes=function(city,state,onSuccess,onFailed,userContext){CoreServices._staticInstance.GetZipCodes(city,state,onSuccess,onFailed,userContext);}
CoreServices.GetZipCode=function(city,state,onSuccess,onFailed,userContext){CoreServices._staticInstance.GetZipCode(city,state,onSuccess,onFailed,userContext);}
CoreServices.GetThemesOfUser=function(onSuccess,onFailed,userContext){CoreServices._staticInstance.GetThemesOfUser(onSuccess,onFailed,userContext);}
CoreServices.CreateCustomTheme=function(onSuccess,onFailed,userContext){CoreServices._staticInstance.CreateCustomTheme(onSuccess,onFailed,userContext);}
CoreServices.DeleteCustomTheme=function(customThemeId,onSuccess,onFailed,userContext){CoreServices._staticInstance.DeleteCustomTheme(customThemeId,onSuccess,onFailed,userContext);}
CoreServices.ChangeCustomTheme=function(customThemeId,properties,onSuccess,onFailed,userContext){CoreServices._staticInstance.ChangeCustomTheme(customThemeId,properties,onSuccess,onFailed,userContext);}
CoreServices.SendTheme=function(themeName,customThemeId,onSuccess,onFailed,userContext){CoreServices._staticInstance.SendTheme(themeName,customThemeId,onSuccess,onFailed,userContext);}
var gtc=Sys.Net.WebServiceProxy._generateTypedConstructor;
Type.registerNamespace('Pageflakes');
if(typeof(Pageflakes.UserPageSetupInfo)==='undefined'){
Pageflakes.UserPageSetupInfo=gtc("Pageflakes.UserPageSetupInfo");
Pageflakes.UserPageSetupInfo.registerClass('Pageflakes.UserPageSetupInfo');}
Type.registerNamespace('Pageflakes.ObjectModel');
if(typeof(Pageflakes.ObjectModel.PageflakeInfo)==='undefined'){
Pageflakes.ObjectModel.PageflakeInfo=gtc("Pageflakes.ObjectModel.PageflakeInfo");
Pageflakes.ObjectModel.PageflakeInfo.registerClass('Pageflakes.ObjectModel.PageflakeInfo');}
if(typeof(Pageflakes.ObjectModel.PageParts)==='undefined'){
Pageflakes.ObjectModel.PageParts=gtc("Pageflakes.ObjectModel.PageParts");
Pageflakes.ObjectModel.PageParts.registerClass('Pageflakes.ObjectModel.PageParts');}
if(typeof(Pageflakes.ObjectModel.PageSetting)==='undefined'){
Pageflakes.ObjectModel.PageSetting=gtc("Pageflakes.ObjectModel.PageSetting");
Pageflakes.ObjectModel.PageSetting.registerClass('Pageflakes.ObjectModel.PageSetting');}
if(typeof(Pageflakes.ObjectModel.Module)==='undefined'){
Pageflakes.ObjectModel.Module=gtc("Pageflakes.ObjectModel.Module");
Pageflakes.ObjectModel.Module.registerClass('Pageflakes.ObjectModel.Module');}
if(typeof(Pageflakes.ObjectModel.Module2)==='undefined'){
Pageflakes.ObjectModel.Module2=gtc("Pageflakes.ObjectModel.Module2");
Pageflakes.ObjectModel.Module2.registerClass('Pageflakes.ObjectModel.Module2');}
if(typeof(Pageflakes.ObjectModel.ContentType)==='undefined'){
Pageflakes.ObjectModel.ContentType=gtc("Pageflakes.ObjectModel.ContentType");
Pageflakes.ObjectModel.ContentType.registerClass('Pageflakes.ObjectModel.ContentType');}
if(typeof(Pageflakes.ObjectModel.Template)==='undefined'){
Pageflakes.ObjectModel.Template=gtc("Pageflakes.ObjectModel.Template");
Pageflakes.ObjectModel.Template.registerClass('Pageflakes.ObjectModel.Template');}
if(typeof(Pageflakes.ObjectModel.UserMetadata)==='undefined'){
Pageflakes.ObjectModel.UserMetadata=gtc("Pageflakes.ObjectModel.UserMetadata");
Pageflakes.ObjectModel.UserMetadata.registerClass('Pageflakes.ObjectModel.UserMetadata');}
if(typeof(Pageflakes.IPLocation)==='undefined'){
Pageflakes.IPLocation=gtc("Pageflakes.IPLocation");
Pageflakes.IPLocation.registerClass('Pageflakes.IPLocation');}
if(typeof(CoreServices_LiteTooltip)==='undefined'){
var CoreServices_LiteTooltip=gtc("CoreServices+LiteTooltip");
CoreServices_LiteTooltip.registerClass('CoreServices_LiteTooltip');}
var DataServices=function(){
DataServices.initializeBase(this);
this._timeout=0;
this._userContext=null;
this._succeeded=null;
this._failed=null;}
DataServices.prototype={
GetRows:function(flakeId,userGuid,spName,paramStr,succeededCallback,failedCallback,userContext){
return this._invoke(DataServices.get_path(),'GetRows',false,{flakeId:flakeId,userGuid:userGuid,spName:spName,paramStr:paramStr},succeededCallback,failedCallback,userContext);},
GetRows2:function(flakeId,userGuid,spName,parameters,succeededCallback,failedCallback,userContext){
return this._invoke(DataServices.get_path(),'GetRows2',false,{flakeId:flakeId,userGuid:userGuid,spName:spName,parameters:parameters},succeededCallback,failedCallback,userContext);},
ExecuteSP:function(flakeId,userGuid,spName,paramStr,succeededCallback,failedCallback,userContext){
return this._invoke(DataServices.get_path(),'ExecuteSP',false,{flakeId:flakeId,userGuid:userGuid,spName:spName,paramStr:paramStr},succeededCallback,failedCallback,userContext);},
ExecuteSP2:function(flakeId,userGuid,spName,parameters,succeededCallback,failedCallback,userContext){
return this._invoke(DataServices.get_path(),'ExecuteSP2',false,{flakeId:flakeId,userGuid:userGuid,spName:spName,parameters:parameters},succeededCallback,failedCallback,userContext);}}
DataServices.registerClass('DataServices',Sys.Net.WebServiceProxy);
DataServices._staticInstance=new DataServices();
DataServices.set_path=function(value){DataServices._staticInstance._path=value;}
DataServices.get_path=function(){return DataServices._staticInstance._path;}
DataServices.set_timeout=function(value){DataServices._staticInstance._timeout=value;}
DataServices.get_timeout=function(){return DataServices._staticInstance._timeout;}
DataServices.set_defaultUserContext=function(value){DataServices._staticInstance._userContext=value;}
DataServices.get_defaultUserContext=function(){return DataServices._staticInstance._userContext;}
DataServices.set_defaultSucceededCallback=function(value){DataServices._staticInstance._succeeded=value;}
DataServices.get_defaultSucceededCallback=function(){return DataServices._staticInstance._succeeded;}
DataServices.set_defaultFailedCallback=function(value){DataServices._staticInstance._failed=value;}
DataServices.get_defaultFailedCallback=function(){return DataServices._staticInstance._failed;}
DataServices.set_path("/DataServices.asmx");
DataServices.GetRows=function(flakeId,userGuid,spName,paramStr,onSuccess,onFailed,userContext){DataServices._staticInstance.GetRows(flakeId,userGuid,spName,paramStr,onSuccess,onFailed,userContext);}
DataServices.GetRows2=function(flakeId,userGuid,spName,parameters,onSuccess,onFailed,userContext){DataServices._staticInstance.GetRows2(flakeId,userGuid,spName,parameters,onSuccess,onFailed,userContext);}
DataServices.ExecuteSP=function(flakeId,userGuid,spName,paramStr,onSuccess,onFailed,userContext){DataServices._staticInstance.ExecuteSP(flakeId,userGuid,spName,paramStr,onSuccess,onFailed,userContext);}
DataServices.ExecuteSP2=function(flakeId,userGuid,spName,parameters,onSuccess,onFailed,userContext){DataServices._staticInstance.ExecuteSP2(flakeId,userGuid,spName,parameters,onSuccess,onFailed,userContext);}
var DictionaryWS=function(){
DictionaryWS.initializeBase(this);
this._timeout=0;
this._userContext=null;
this._succeeded=null;
this._failed=null;}
DictionaryWS.prototype={
GetWordList:function(prefixText,succeededCallback,failedCallback,userContext){
return this._invoke(DictionaryWS.get_path(),'GetWordList',true,{prefixText:prefixText},succeededCallback,failedCallback,userContext);}}
DictionaryWS.registerClass('DictionaryWS',Sys.Net.WebServiceProxy);
DictionaryWS._staticInstance=new DictionaryWS();
DictionaryWS.set_path=function(value){DictionaryWS._staticInstance._path=value;}
DictionaryWS.get_path=function(){return DictionaryWS._staticInstance._path;}
DictionaryWS.set_timeout=function(value){DictionaryWS._staticInstance._timeout=value;}
DictionaryWS.get_timeout=function(){return DictionaryWS._staticInstance._timeout;}
DictionaryWS.set_defaultUserContext=function(value){DictionaryWS._staticInstance._userContext=value;}
DictionaryWS.get_defaultUserContext=function(){return DictionaryWS._staticInstance._userContext;}
DictionaryWS.set_defaultSucceededCallback=function(value){DictionaryWS._staticInstance._succeeded=value;}
DictionaryWS.get_defaultSucceededCallback=function(){return DictionaryWS._staticInstance._succeeded;}
DictionaryWS.set_defaultFailedCallback=function(value){DictionaryWS._staticInstance._failed=value;}
DictionaryWS.get_defaultFailedCallback=function(){return DictionaryWS._staticInstance._failed;}
DictionaryWS.set_path("/DictionaryWS.asmx");
DictionaryWS.GetWordList=function(prefixText,onSuccess,onFailed,userContext){DictionaryWS._staticInstance.GetWordList(prefixText,onSuccess,onFailed,userContext);}
var GmailFlakeWS=function(){
GmailFlakeWS.initializeBase(this);
this._timeout=0;
this._userContext=null;
this._succeeded=null;
this._failed=null;}
GmailFlakeWS.prototype={
GetInbox:function(userName,password,moduleId,userGuid,noOfEmailsToView,succeededCallback,failedCallback,userContext){
return this._invoke(GmailFlakeWS.get_path(),'GetInbox',true,{userName:userName,password:password,moduleId:moduleId,userGuid:userGuid,noOfEmailsToView:noOfEmailsToView},succeededCallback,failedCallback,userContext);}}
GmailFlakeWS.registerClass('GmailFlakeWS',Sys.Net.WebServiceProxy);
GmailFlakeWS._staticInstance=new GmailFlakeWS();
GmailFlakeWS.set_path=function(value){GmailFlakeWS._staticInstance._path=value;}
GmailFlakeWS.get_path=function(){return GmailFlakeWS._staticInstance._path;}
GmailFlakeWS.set_timeout=function(value){GmailFlakeWS._staticInstance._timeout=value;}
GmailFlakeWS.get_timeout=function(){return GmailFlakeWS._staticInstance._timeout;}
GmailFlakeWS.set_defaultUserContext=function(value){GmailFlakeWS._staticInstance._userContext=value;}
GmailFlakeWS.get_defaultUserContext=function(){return GmailFlakeWS._staticInstance._userContext;}
GmailFlakeWS.set_defaultSucceededCallback=function(value){GmailFlakeWS._staticInstance._succeeded=value;}
GmailFlakeWS.get_defaultSucceededCallback=function(){return GmailFlakeWS._staticInstance._succeeded;}
GmailFlakeWS.set_defaultFailedCallback=function(value){GmailFlakeWS._staticInstance._failed=value;}
GmailFlakeWS.get_defaultFailedCallback=function(){return GmailFlakeWS._staticInstance._failed;}
GmailFlakeWS.set_path("/GmailFlakeWS.asmx");
GmailFlakeWS.GetInbox=function(userName,password,moduleId,userGuid,noOfEmailsToView,onSuccess,onFailed,userContext){GmailFlakeWS._staticInstance.GetInbox(userName,password,moduleId,userGuid,noOfEmailsToView,onSuccess,onFailed,userContext);}
var QuoteofDayWS=function(){
QuoteofDayWS.initializeBase(this);
this._timeout=0;
this._userContext=null;
this._succeeded=null;
this._failed=null;}
QuoteofDayWS.prototype={
GetQuotes:function(succeededCallback,failedCallback,userContext){
return this._invoke(QuoteofDayWS.get_path(),'GetQuotes',true,{},succeededCallback,failedCallback,userContext);}}
QuoteofDayWS.registerClass('QuoteofDayWS',Sys.Net.WebServiceProxy);
QuoteofDayWS._staticInstance=new QuoteofDayWS();
QuoteofDayWS.set_path=function(value){QuoteofDayWS._staticInstance._path=value;}
QuoteofDayWS.get_path=function(){return QuoteofDayWS._staticInstance._path;}
QuoteofDayWS.set_timeout=function(value){QuoteofDayWS._staticInstance._timeout=value;}
QuoteofDayWS.get_timeout=function(){return QuoteofDayWS._staticInstance._timeout;}
QuoteofDayWS.set_defaultUserContext=function(value){QuoteofDayWS._staticInstance._userContext=value;}
QuoteofDayWS.get_defaultUserContext=function(){return QuoteofDayWS._staticInstance._userContext;}
QuoteofDayWS.set_defaultSucceededCallback=function(value){QuoteofDayWS._staticInstance._succeeded=value;}
QuoteofDayWS.get_defaultSucceededCallback=function(){return QuoteofDayWS._staticInstance._succeeded;}
QuoteofDayWS.set_defaultFailedCallback=function(value){QuoteofDayWS._staticInstance._failed=value;}
QuoteofDayWS.get_defaultFailedCallback=function(){return QuoteofDayWS._staticInstance._failed;}
QuoteofDayWS.set_path("/QuoteOfDayWS.asmx");
QuoteofDayWS.GetQuotes=function(onSuccess,onFailed,userContext){QuoteofDayWS._staticInstance.GetQuotes(onSuccess,onFailed,userContext);}
var gtc=Sys.Net.WebServiceProxy._generateTypedConstructor;
if(typeof(QuoteofDayWS_TheQuote)==='undefined'){
var QuoteofDayWS_TheQuote=gtc("QuoteofDayWS+TheQuote");
QuoteofDayWS_TheQuote.registerClass('QuoteofDayWS_TheQuote');}
var RssServices=function(){
RssServices.initializeBase(this);
this._timeout=0;
this._userContext=null;
this._succeeded=null;
this._failed=null;}
RssServices.prototype={
GetRSSChannel6:function(url,extendedTags,userName,password,succeededCallback,failedCallback,userContext){
return this._invoke(RssServices.get_path(),'GetRSSChannel6',false,{url:url,extendedTags:extendedTags,userName:userName,password:password},succeededCallback,failedCallback,userContext);},
GetRSSChannel5:function(url,startIndex,pageSize,key,succeededCallback,failedCallback,userContext){
return this._invoke(RssServices.get_path(),'GetRSSChannel5',true,{url:url,startIndex:startIndex,pageSize:pageSize,key:key},succeededCallback,failedCallback,userContext);},
GetRSSChannel4:function(url,userName,password,succeededCallback,failedCallback,userContext){
return this._invoke(RssServices.get_path(),'GetRSSChannel4',false,{url:url,userName:userName,password:password},succeededCallback,failedCallback,userContext);},
GetRSSChannel3:function(url,forceUpdate,startIndex,pageSize,succeededCallback,failedCallback,userContext){
return this._invoke(RssServices.get_path(),'GetRSSChannel3',true,{url:url,forceUpdate:forceUpdate,startIndex:startIndex,pageSize:pageSize},succeededCallback,failedCallback,userContext);},
GetRSSChannel2:function(url,extendedTags,startIndex,succeededCallback,failedCallback,userContext){
return this._invoke(RssServices.get_path(),'GetRSSChannel2',true,{url:url,extendedTags:extendedTags,startIndex:startIndex},succeededCallback,failedCallback,userContext);},
GetRSSChannels:function(urls,startIndex,succeededCallback,failedCallback,userContext){
return this._invoke(RssServices.get_path(),'GetRSSChannels',true,{urls:urls,startIndex:startIndex},succeededCallback,failedCallback,userContext);},
GetRSSChannels2:function(urls,extendedTags,startIndex,succeededCallback,failedCallback,userContext){
return this._invoke(RssServices.get_path(),'GetRSSChannels2',true,{urls:urls,extendedTags:extendedTags,startIndex:startIndex},succeededCallback,failedCallback,userContext);},
GetRSSChannel:function(url,forceUpdate,startIndex,succeededCallback,failedCallback,userContext){
return this._invoke(RssServices.get_path(),'GetRSSChannel',true,{url:url,forceUpdate:forceUpdate,startIndex:startIndex},succeededCallback,failedCallback,userContext);},
GetRSSChannelList:function(succeededCallback,failedCallback,userContext){
return this._invoke(RssServices.get_path(),'GetRSSChannelList',true,{},succeededCallback,failedCallback,userContext);},
GetRSSItemStatus:function(url,startIndex,succeededCallback,failedCallback,userContext){
return this._invoke(RssServices.get_path(),'GetRSSItemStatus',true,{url:url,startIndex:startIndex},succeededCallback,failedCallback,userContext);},
ChangeRSSItemReadStatus:function(channelId,rssItemId,isRead,succeededCallback,failedCallback,userContext){
return this._invoke(RssServices.get_path(),'ChangeRSSItemReadStatus',true,{channelId:channelId,rssItemId:rssItemId,isRead:isRead},succeededCallback,failedCallback,userContext);},
ChangeRSSItemReadStatus2:function(channelId,rssItemIdsToMark,isRead,succeededCallback,failedCallback,userContext){
return this._invoke(RssServices.get_path(),'ChangeRSSItemReadStatus2',true,{channelId:channelId,rssItemIdsToMark:rssItemIdsToMark,isRead:isRead},succeededCallback,failedCallback,userContext);},
ChangeRSSItemReadStatus3:function(rssItems,succeededCallback,failedCallback,userContext){
return this._invoke(RssServices.get_path(),'ChangeRSSItemReadStatus3',true,{rssItems:rssItems},succeededCallback,failedCallback,userContext);},
ChangeChannelsReadStatus:function(channelIDs,isRead,succeededCallback,failedCallback,userContext){
return this._invoke(RssServices.get_path(),'ChangeChannelsReadStatus',false,{channelIDs:channelIDs,isRead:isRead},succeededCallback,failedCallback,userContext);},
GetSavedRssItems:function(succeededCallback,failedCallback,userContext){
return this._invoke(RssServices.get_path(),'GetSavedRssItems',true,{},succeededCallback,failedCallback,userContext);},
SaveRSSItem:function(rssItemId,isRead,succeededCallback,failedCallback,userContext){
return this._invoke(RssServices.get_path(),'SaveRSSItem',true,{rssItemId:rssItemId,isRead:isRead},succeededCallback,failedCallback,userContext);},
RemoveSavedRSSItem:function(rssItemId,succeededCallback,failedCallback,userContext){
return this._invoke(RssServices.get_path(),'RemoveSavedRSSItem',true,{rssItemId:rssItemId},succeededCallback,failedCallback,userContext);},
GetSubscribedRssChannels:function(succeededCallback,failedCallback,userContext){
return this._invoke(RssServices.get_path(),'GetSubscribedRssChannels',true,{},succeededCallback,failedCallback,userContext);},
GetSourceURLByRSSChannelID:function(channelID,succeededCallback,failedCallback,userContext){
return this._invoke(RssServices.get_path(),'GetSourceURLByRSSChannelID',true,{channelID:channelID},succeededCallback,failedCallback,userContext);},
Unsubscribe:function(url,succeededCallback,failedCallback,userContext){
return this._invoke(RssServices.get_path(),'Unsubscribe',true,{url:url},succeededCallback,failedCallback,userContext);},
Test:function(succeededCallback,failedCallback,userContext){
return this._invoke(RssServices.get_path(),'Test',false,{},succeededCallback,failedCallback,userContext);}}
RssServices.registerClass('RssServices',Sys.Net.WebServiceProxy);
RssServices._staticInstance=new RssServices();
RssServices.set_path=function(value){RssServices._staticInstance._path=value;}
RssServices.get_path=function(){return RssServices._staticInstance._path;}
RssServices.set_timeout=function(value){RssServices._staticInstance._timeout=value;}
RssServices.get_timeout=function(){return RssServices._staticInstance._timeout;}
RssServices.set_defaultUserContext=function(value){RssServices._staticInstance._userContext=value;}
RssServices.get_defaultUserContext=function(){return RssServices._staticInstance._userContext;}
RssServices.set_defaultSucceededCallback=function(value){RssServices._staticInstance._succeeded=value;}
RssServices.get_defaultSucceededCallback=function(){return RssServices._staticInstance._succeeded;}
RssServices.set_defaultFailedCallback=function(value){RssServices._staticInstance._failed=value;}
RssServices.get_defaultFailedCallback=function(){return RssServices._staticInstance._failed;}
RssServices.set_path("/RSSServices.asmx");
RssServices.GetRSSChannel6=function(url,extendedTags,userName,password,onSuccess,onFailed,userContext){RssServices._staticInstance.GetRSSChannel6(url,extendedTags,userName,password,onSuccess,onFailed,userContext);}
RssServices.GetRSSChannel5=function(url,startIndex,pageSize,key,onSuccess,onFailed,userContext){RssServices._staticInstance.GetRSSChannel5(url,startIndex,pageSize,key,onSuccess,onFailed,userContext);}
RssServices.GetRSSChannel4=function(url,userName,password,onSuccess,onFailed,userContext){RssServices._staticInstance.GetRSSChannel4(url,userName,password,onSuccess,onFailed,userContext);}
RssServices.GetRSSChannel3=function(url,forceUpdate,startIndex,pageSize,onSuccess,onFailed,userContext){RssServices._staticInstance.GetRSSChannel3(url,forceUpdate,startIndex,pageSize,onSuccess,onFailed,userContext);}
RssServices.GetRSSChannel2=function(url,extendedTags,startIndex,onSuccess,onFailed,userContext){RssServices._staticInstance.GetRSSChannel2(url,extendedTags,startIndex,onSuccess,onFailed,userContext);}
RssServices.GetRSSChannels=function(urls,startIndex,onSuccess,onFailed,userContext){RssServices._staticInstance.GetRSSChannels(urls,startIndex,onSuccess,onFailed,userContext);}
RssServices.GetRSSChannels2=function(urls,extendedTags,startIndex,onSuccess,onFailed,userContext){RssServices._staticInstance.GetRSSChannels2(urls,extendedTags,startIndex,onSuccess,onFailed,userContext);}
RssServices.GetRSSChannel=function(url,forceUpdate,startIndex,onSuccess,onFailed,userContext){RssServices._staticInstance.GetRSSChannel(url,forceUpdate,startIndex,onSuccess,onFailed,userContext);}
RssServices.GetRSSChannelList=function(onSuccess,onFailed,userContext){RssServices._staticInstance.GetRSSChannelList(onSuccess,onFailed,userContext);}
RssServices.GetRSSItemStatus=function(url,startIndex,onSuccess,onFailed,userContext){RssServices._staticInstance.GetRSSItemStatus(url,startIndex,onSuccess,onFailed,userContext);}
RssServices.ChangeRSSItemReadStatus=function(channelId,rssItemId,isRead,onSuccess,onFailed,userContext){RssServices._staticInstance.ChangeRSSItemReadStatus(channelId,rssItemId,isRead,onSuccess,onFailed,userContext);}
RssServices.ChangeRSSItemReadStatus2=function(channelId,rssItemIdsToMark,isRead,onSuccess,onFailed,userContext){RssServices._staticInstance.ChangeRSSItemReadStatus2(channelId,rssItemIdsToMark,isRead,onSuccess,onFailed,userContext);}
RssServices.ChangeRSSItemReadStatus3=function(rssItems,onSuccess,onFailed,userContext){RssServices._staticInstance.ChangeRSSItemReadStatus3(rssItems,onSuccess,onFailed,userContext);}
RssServices.ChangeChannelsReadStatus=function(channelIDs,isRead,onSuccess,onFailed,userContext){RssServices._staticInstance.ChangeChannelsReadStatus(channelIDs,isRead,onSuccess,onFailed,userContext);}
RssServices.GetSavedRssItems=function(onSuccess,onFailed,userContext){RssServices._staticInstance.GetSavedRssItems(onSuccess,onFailed,userContext);}
RssServices.SaveRSSItem=function(rssItemId,isRead,onSuccess,onFailed,userContext){RssServices._staticInstance.SaveRSSItem(rssItemId,isRead,onSuccess,onFailed,userContext);}
RssServices.RemoveSavedRSSItem=function(rssItemId,onSuccess,onFailed,userContext){RssServices._staticInstance.RemoveSavedRSSItem(rssItemId,onSuccess,onFailed,userContext);}
RssServices.GetSubscribedRssChannels=function(onSuccess,onFailed,userContext){RssServices._staticInstance.GetSubscribedRssChannels(onSuccess,onFailed,userContext);}
RssServices.GetSourceURLByRSSChannelID=function(channelID,onSuccess,onFailed,userContext){RssServices._staticInstance.GetSourceURLByRSSChannelID(channelID,onSuccess,onFailed,userContext);}
RssServices.Unsubscribe=function(url,onSuccess,onFailed,userContext){RssServices._staticInstance.Unsubscribe(url,onSuccess,onFailed,userContext);}
RssServices.Test=function(onSuccess,onFailed,userContext){RssServices._staticInstance.Test(onSuccess,onFailed,userContext);}
var gtc=Sys.Net.WebServiceProxy._generateTypedConstructor;
Type.registerNamespace('Pageflakes');
if(typeof(Pageflakes.RSSChannel)==='undefined'){
Pageflakes.RSSChannel=gtc("Pageflakes.RSSChannel");
Pageflakes.RSSChannel.registerClass('Pageflakes.RSSChannel');}
if(typeof(RssServices_RSSItemStatus)==='undefined'){
var RssServices_RSSItemStatus=gtc("RssServices+RSSItemStatus");
RssServices_RSSItemStatus.registerClass('RssServices_RSSItemStatus');}
if(typeof(Pageflakes.RSSItem)==='undefined'){
Pageflakes.RSSItem=gtc("Pageflakes.RSSItem");
Pageflakes.RSSItem.registerClass('Pageflakes.RSSItem');}
var ToDoListWS=function(){
ToDoListWS.initializeBase(this);
this._timeout=0;
this._userContext=null;
this._succeeded=null;
this._failed=null;}
ToDoListWS.prototype={
SaveUserSettings:function(moduleId,email,timeZone,userGuid,succeededCallback,failedCallback,userContext){
return this._invoke(ToDoListWS.get_path(),'SaveUserSettings',true,{moduleId:moduleId,email:email,timeZone:timeZone,userGuid:userGuid},succeededCallback,failedCallback,userContext);},
GetUserSettings:function(moduleId,userGuid,succeededCallback,failedCallback,userContext){
return this._invoke(ToDoListWS.get_path(),'GetUserSettings',true,{moduleId:moduleId,userGuid:userGuid},succeededCallback,failedCallback,userContext);},
GetTotalListCount:function(moduleId,userGuid,succeededCallback,failedCallback,userContext){
return this._invoke(ToDoListWS.get_path(),'GetTotalListCount',true,{moduleId:moduleId,userGuid:userGuid},succeededCallback,failedCallback,userContext);},
GetFirstTaskListId:function(moduleId,userGuid,succeededCallback,failedCallback,userContext){
return this._invoke(ToDoListWS.get_path(),'GetFirstTaskListId',true,{moduleId:moduleId,userGuid:userGuid},succeededCallback,failedCallback,userContext);},
GetDueReminders:function(moduleId,userGuid,succeededCallback,failedCallback,userContext){
return this._invoke(ToDoListWS.get_path(),'GetDueReminders',true,{moduleId:moduleId,userGuid:userGuid},succeededCallback,failedCallback,userContext);},
GetOverDueRemindersByOverDueTime:function(moduleId,overDueSeconds,userGuid,succeededCallback,failedCallback,userContext){
return this._invoke(ToDoListWS.get_path(),'GetOverDueRemindersByOverDueTime',true,{moduleId:moduleId,overDueSeconds:overDueSeconds,userGuid:userGuid},succeededCallback,failedCallback,userContext);},
GetOverDueReminders:function(moduleId,userGuid,succeededCallback,failedCallback,userContext){
return this._invoke(ToDoListWS.get_path(),'GetOverDueReminders',true,{moduleId:moduleId,userGuid:userGuid},succeededCallback,failedCallback,userContext);},
SaveList:function(listId,name,moduleId,userGuid,succeededCallback,failedCallback,userContext){
return this._invoke(ToDoListWS.get_path(),'SaveList',true,{listId:listId,name:name,moduleId:moduleId,userGuid:userGuid},succeededCallback,failedCallback,userContext);},
GetListTabs:function(selectedListId,moduleId,userGuid,succeededCallback,failedCallback,userContext){
return this._invoke(ToDoListWS.get_path(),'GetListTabs',true,{selectedListId:selectedListId,moduleId:moduleId,userGuid:userGuid},succeededCallback,failedCallback,userContext);},
GetListByListId:function(listId,moduleId,userGuid,succeededCallback,failedCallback,userContext){
return this._invoke(ToDoListWS.get_path(),'GetListByListId',true,{listId:listId,moduleId:moduleId,userGuid:userGuid},succeededCallback,failedCallback,userContext);},
SaveTask:function(taskId,name,description,hasDueDate,strDueDate,hasReminder,remindTime,listId,moduleId,userGuid,succeededCallback,failedCallback,userContext){
return this._invoke(ToDoListWS.get_path(),'SaveTask',true,{taskId:taskId,name:name,description:description,hasDueDate:hasDueDate,strDueDate:strDueDate,hasReminder:hasReminder,remindTime:remindTime,listId:listId,moduleId:moduleId,userGuid:userGuid},succeededCallback,failedCallback,userContext);},
GetTaskByTaskId:function(taskId,moduleId,userGuid,succeededCallback,failedCallback,userContext){
return this._invoke(ToDoListWS.get_path(),'GetTaskByTaskId',true,{taskId:taskId,moduleId:moduleId,userGuid:userGuid},succeededCallback,failedCallback,userContext);},
GetTasksInList:function(taskListId,moduleId,userGuid,succeededCallback,failedCallback,userContext){
return this._invoke(ToDoListWS.get_path(),'GetTasksInList',true,{taskListId:taskListId,moduleId:moduleId,userGuid:userGuid},succeededCallback,failedCallback,userContext);},
DeleteTask:function(taskId,moduleId,userGuid,succeededCallback,failedCallback,userContext){
return this._invoke(ToDoListWS.get_path(),'DeleteTask',true,{taskId:taskId,moduleId:moduleId,userGuid:userGuid},succeededCallback,failedCallback,userContext);},
DeleteList:function(listId,moduleId,userGuid,succeededCallback,failedCallback,userContext){
return this._invoke(ToDoListWS.get_path(),'DeleteList',true,{listId:listId,moduleId:moduleId,userGuid:userGuid},succeededCallback,failedCallback,userContext);},
ToggleTaskStatus:function(taskId,moduleId,userGuid,succeededCallback,failedCallback,userContext){
return this._invoke(ToDoListWS.get_path(),'ToggleTaskStatus',true,{taskId:taskId,moduleId:moduleId,userGuid:userGuid},succeededCallback,failedCallback,userContext);},
SendAlert:function(succeededCallback,failedCallback,userContext){
return this._invoke(ToDoListWS.get_path(),'SendAlert',true,{},succeededCallback,failedCallback,userContext);},
Export:function(flakeId,userName,profile,succeededCallback,failedCallback,userContext){
return this._invoke(ToDoListWS.get_path(),'Export',true,{flakeId:flakeId,userName:userName,profile:profile},succeededCallback,failedCallback,userContext);},
Import:function(flakeId,userName,profile,succeededCallback,failedCallback,userContext){
return this._invoke(ToDoListWS.get_path(),'Import',true,{flakeId:flakeId,userName:userName,profile:profile},succeededCallback,failedCallback,userContext);}}
ToDoListWS.registerClass('ToDoListWS',Sys.Net.WebServiceProxy);
ToDoListWS._staticInstance=new ToDoListWS();
ToDoListWS.set_path=function(value){ToDoListWS._staticInstance._path=value;}
ToDoListWS.get_path=function(){return ToDoListWS._staticInstance._path;}
ToDoListWS.set_timeout=function(value){ToDoListWS._staticInstance._timeout=value;}
ToDoListWS.get_timeout=function(){return ToDoListWS._staticInstance._timeout;}
ToDoListWS.set_defaultUserContext=function(value){ToDoListWS._staticInstance._userContext=value;}
ToDoListWS.get_defaultUserContext=function(){return ToDoListWS._staticInstance._userContext;}
ToDoListWS.set_defaultSucceededCallback=function(value){ToDoListWS._staticInstance._succeeded=value;}
ToDoListWS.get_defaultSucceededCallback=function(){return ToDoListWS._staticInstance._succeeded;}
ToDoListWS.set_defaultFailedCallback=function(value){ToDoListWS._staticInstance._failed=value;}
ToDoListWS.get_defaultFailedCallback=function(){return ToDoListWS._staticInstance._failed;}
ToDoListWS.set_path("/ToDoListWS.asmx");
ToDoListWS.SaveUserSettings=function(moduleId,email,timeZone,userGuid,onSuccess,onFailed,userContext){ToDoListWS._staticInstance.SaveUserSettings(moduleId,email,timeZone,userGuid,onSuccess,onFailed,userContext);}
ToDoListWS.GetUserSettings=function(moduleId,userGuid,onSuccess,onFailed,userContext){ToDoListWS._staticInstance.GetUserSettings(moduleId,userGuid,onSuccess,onFailed,userContext);}
ToDoListWS.GetTotalListCount=function(moduleId,userGuid,onSuccess,onFailed,userContext){ToDoListWS._staticInstance.GetTotalListCount(moduleId,userGuid,onSuccess,onFailed,userContext);}
ToDoListWS.GetFirstTaskListId=function(moduleId,userGuid,onSuccess,onFailed,userContext){ToDoListWS._staticInstance.GetFirstTaskListId(moduleId,userGuid,onSuccess,onFailed,userContext);}
ToDoListWS.GetDueReminders=function(moduleId,userGuid,onSuccess,onFailed,userContext){ToDoListWS._staticInstance.GetDueReminders(moduleId,userGuid,onSuccess,onFailed,userContext);}
ToDoListWS.GetOverDueRemindersByOverDueTime=function(moduleId,overDueSeconds,userGuid,onSuccess,onFailed,userContext){ToDoListWS._staticInstance.GetOverDueRemindersByOverDueTime(moduleId,overDueSeconds,userGuid,onSuccess,onFailed,userContext);}
ToDoListWS.GetOverDueReminders=function(moduleId,userGuid,onSuccess,onFailed,userContext){ToDoListWS._staticInstance.GetOverDueReminders(moduleId,userGuid,onSuccess,onFailed,userContext);}
ToDoListWS.SaveList=function(listId,name,moduleId,userGuid,onSuccess,onFailed,userContext){ToDoListWS._staticInstance.SaveList(listId,name,moduleId,userGuid,onSuccess,onFailed,userContext);}
ToDoListWS.GetListTabs=function(selectedListId,moduleId,userGuid,onSuccess,onFailed,userContext){ToDoListWS._staticInstance.GetListTabs(selectedListId,moduleId,userGuid,onSuccess,onFailed,userContext);}
ToDoListWS.GetListByListId=function(listId,moduleId,userGuid,onSuccess,onFailed,userContext){ToDoListWS._staticInstance.GetListByListId(listId,moduleId,userGuid,onSuccess,onFailed,userContext);}
ToDoListWS.SaveTask=function(taskId,name,description,hasDueDate,strDueDate,hasReminder,remindTime,listId,moduleId,userGuid,onSuccess,onFailed,userContext){ToDoListWS._staticInstance.SaveTask(taskId,name,description,hasDueDate,strDueDate,hasReminder,remindTime,listId,moduleId,userGuid,onSuccess,onFailed,userContext);}
ToDoListWS.GetTaskByTaskId=function(taskId,moduleId,userGuid,onSuccess,onFailed,userContext){ToDoListWS._staticInstance.GetTaskByTaskId(taskId,moduleId,userGuid,onSuccess,onFailed,userContext);}
ToDoListWS.GetTasksInList=function(taskListId,moduleId,userGuid,onSuccess,onFailed,userContext){ToDoListWS._staticInstance.GetTasksInList(taskListId,moduleId,userGuid,onSuccess,onFailed,userContext);}
ToDoListWS.DeleteTask=function(taskId,moduleId,userGuid,onSuccess,onFailed,userContext){ToDoListWS._staticInstance.DeleteTask(taskId,moduleId,userGuid,onSuccess,onFailed,userContext);}
ToDoListWS.DeleteList=function(listId,moduleId,userGuid,onSuccess,onFailed,userContext){ToDoListWS._staticInstance.DeleteList(listId,moduleId,userGuid,onSuccess,onFailed,userContext);}
ToDoListWS.ToggleTaskStatus=function(taskId,moduleId,userGuid,onSuccess,onFailed,userContext){ToDoListWS._staticInstance.ToggleTaskStatus(taskId,moduleId,userGuid,onSuccess,onFailed,userContext);}
ToDoListWS.SendAlert=function(onSuccess,onFailed,userContext){ToDoListWS._staticInstance.SendAlert(onSuccess,onFailed,userContext);}
ToDoListWS.Export=function(flakeId,userName,profile,onSuccess,onFailed,userContext){ToDoListWS._staticInstance.Export(flakeId,userName,profile,onSuccess,onFailed,userContext);}
ToDoListWS.Import=function(flakeId,userName,profile,onSuccess,onFailed,userContext){ToDoListWS._staticInstance.Import(flakeId,userName,profile,onSuccess,onFailed,userContext);}
var AddContentWS=function(){
AddContentWS.initializeBase(this);
this._timeout=0;
this._userContext=null;
this._succeeded=null;
this._failed=null;}
AddContentWS.prototype={
GetOnsiteFlakeGrid:function(categoryID,succeededCallback,failedCallback,userContext){
return this._invoke(AddContentWS.get_path(),'GetOnsiteFlakeGrid',false,{categoryID:categoryID},succeededCallback,failedCallback,userContext);},
GetOnsiteItemGrid:function(categoryID,version,succeededCallback,failedCallback,userContext){
return this._invoke(AddContentWS.get_path(),'GetOnsiteItemGrid',true,{categoryID:categoryID,version:version},succeededCallback,failedCallback,userContext);},
GetPageSettingsGrid:function(pageSettingValue,domainID,languageID,version,succeededCallback,failedCallback,userContext){
return this._invoke(AddContentWS.get_path(),'GetPageSettingsGrid',true,{pageSettingValue:pageSettingValue,domainID:domainID,languageID:languageID,version:version},succeededCallback,failedCallback,userContext);}}
AddContentWS.registerClass('AddContentWS',Sys.Net.WebServiceProxy);
AddContentWS._staticInstance=new AddContentWS();
AddContentWS.set_path=function(value){AddContentWS._staticInstance._path=value;}
AddContentWS.get_path=function(){return AddContentWS._staticInstance._path;}
AddContentWS.set_timeout=function(value){AddContentWS._staticInstance._timeout=value;}
AddContentWS.get_timeout=function(){return AddContentWS._staticInstance._timeout;}
AddContentWS.set_defaultUserContext=function(value){AddContentWS._staticInstance._userContext=value;}
AddContentWS.get_defaultUserContext=function(){return AddContentWS._staticInstance._userContext;}
AddContentWS.set_defaultSucceededCallback=function(value){AddContentWS._staticInstance._succeeded=value;}
AddContentWS.get_defaultSucceededCallback=function(){return AddContentWS._staticInstance._succeeded;}
AddContentWS.set_defaultFailedCallback=function(value){AddContentWS._staticInstance._failed=value;}
AddContentWS.get_defaultFailedCallback=function(){return AddContentWS._staticInstance._failed;}
AddContentWS.set_path("/AddContentWS.asmx");
AddContentWS.GetOnsiteFlakeGrid=function(categoryID,onSuccess,onFailed,userContext){AddContentWS._staticInstance.GetOnsiteFlakeGrid(categoryID,onSuccess,onFailed,userContext);}
AddContentWS.GetOnsiteItemGrid=function(categoryID,version,onSuccess,onFailed,userContext){AddContentWS._staticInstance.GetOnsiteItemGrid(categoryID,version,onSuccess,onFailed,userContext);}
AddContentWS.GetPageSettingsGrid=function(pageSettingValue,domainID,languageID,version,onSuccess,onFailed,userContext){AddContentWS._staticInstance.GetPageSettingsGrid(pageSettingValue,domainID,languageID,version,onSuccess,onFailed,userContext);}
var VisitorCounterService=function(){
VisitorCounterService.initializeBase(this);
this._timeout=0;
this._userContext=null;
this._succeeded=null;
this._failed=null;}
VisitorCounterService.prototype={
GetPageVisits:function(pageID,flakeID,succeededCallback,failedCallback,userContext){
return this._invoke(VisitorCounterService.get_path(),'GetPageVisits',false,{pageID:pageID,flakeID:flakeID},succeededCallback,failedCallback,userContext);},
IncrementPageHitCount:function(pageID,flakeID,succeededCallback,failedCallback,userContext){
return this._invoke(VisitorCounterService.get_path(),'IncrementPageHitCount',false,{pageID:pageID,flakeID:flakeID},succeededCallback,failedCallback,userContext);}}
VisitorCounterService.registerClass('VisitorCounterService',Sys.Net.WebServiceProxy);
VisitorCounterService._staticInstance=new VisitorCounterService();
VisitorCounterService.set_path=function(value){VisitorCounterService._staticInstance._path=value;}
VisitorCounterService.get_path=function(){return VisitorCounterService._staticInstance._path;}
VisitorCounterService.set_timeout=function(value){VisitorCounterService._staticInstance._timeout=value;}
VisitorCounterService.get_timeout=function(){return VisitorCounterService._staticInstance._timeout;}
VisitorCounterService.set_defaultUserContext=function(value){VisitorCounterService._staticInstance._userContext=value;}
VisitorCounterService.get_defaultUserContext=function(){return VisitorCounterService._staticInstance._userContext;}
VisitorCounterService.set_defaultSucceededCallback=function(value){VisitorCounterService._staticInstance._succeeded=value;}
VisitorCounterService.get_defaultSucceededCallback=function(){return VisitorCounterService._staticInstance._succeeded;}
VisitorCounterService.set_defaultFailedCallback=function(value){VisitorCounterService._staticInstance._failed=value;}
VisitorCounterService.get_defaultFailedCallback=function(){return VisitorCounterService._staticInstance._failed;}
VisitorCounterService.set_path("/VisitorCounterService.asmx");
VisitorCounterService.GetPageVisits=function(pageID,flakeID,onSuccess,onFailed,userContext){VisitorCounterService._staticInstance.GetPageVisits(pageID,flakeID,onSuccess,onFailed,userContext);}
VisitorCounterService.IncrementPageHitCount=function(pageID,flakeID,onSuccess,onFailed,userContext){VisitorCounterService._staticInstance.IncrementPageHitCount(pageID,flakeID,onSuccess,onFailed,userContext);}
var PUBLIC_PAGE_HEADER_OWNER='PUBLIC_PAGE_HEADER_OWNER';
var PUBLIC_PAGE_HEADER_COPY='PUBLIC_PAGE_HEADER_COPY';
var PUBLIC_PAGE_HEADER_RANDOM="PUBLIC_PAGE_HEADER_RANDOM";
var PUBLIC_PAGE_HEADER_LOGIN_LINK="PUBLIC_PAGE_HEADER_LOGIN_LINK";
var PUBLIC_PAGE_HEADER_SEND="PUBLIC_PAGE_HEADER_SEND";
var PUBLIC_PAGE_HEADER_BOOKMARK="PUBLIC_PAGE_HEADER_BOOKMARK";
var PUBLIC_HEADER_IMG_HOME="PUBLIC_HEADER_IMG_HOME";
var PUBLIC_HEADER_CONTAINTER="publicPageHeaderContainer";
var PublicPageHeaderClass=
{
copyButton:null,
randomButton:null,
profileId:0,
init:function()
{
PublicPageHeaderClass.showHeader(false);
if(App.currentPage.IsPublished)
{
SearchForm.close(true);
PublicPageHeaderClass.showHeader(true);
if(App.ViewingPageOf=="")
{
window.setTimeout("PublicPageHeaderClass.setText()",100);}
else
{
PublicPageHeaderClass.setText();}
PublicPageHeaderClass.copyButton=$(PUBLIC_PAGE_HEADER_COPY);
PublicPageHeaderClass.randomButton=$(PUBLIC_PAGE_HEADER_RANDOM);
PublicPageHeaderClass.sendButton=$(PUBLIC_PAGE_HEADER_SEND);
PublicPageHeaderClass.bookmarkButton=$(PUBLIC_PAGE_HEADER_BOOKMARK);
PublicPageHeaderClass.copyButton.onclick=function(event)
{
PublicPageHeaderClass.getACopy();}
PublicPageHeaderClass.sendButton.onclick=function(event)
{
SendPageToFriend.show();}
PublicPageHeaderClass.randomButton.onclick=function(event)
{
PublicPageHeaderClass.getRandomPublicPage();}
PublicPageHeaderClass.bookmarkButton.onclick=function(event)
{
PublicPageHeaderClass.boomarkPage();}
if($(PUBLIC_PAGE_HEADER_LOGIN_LINK)!=null)
{
$(PUBLIC_PAGE_HEADER_LOGIN_LINK).href=SITE_PREFIX+"login.aspx?ReturnUrl="+document.location.href;}
PublicPageHeaderClass.initializeProfile();}},
showHeader:function(status)
{
if($(PUBLIC_HEADER_CONTAINTER)!=null)
{
if(!status)
{
$('header').style.marginTop="0px";
$(PUBLIC_HEADER_CONTAINTER).style.display="none";}
else
{
$('header').style.marginTop="20px";
$(PUBLIC_HEADER_CONTAINTER).style.display="block";}}},
setText:function()
{
$(PUBLIC_PAGE_HEADER_OWNER).innerHTML=App.ViewingPageOf+"'s Pagecast";},
getACopy:function()
{
App.Server.CreateCopyOfPage(App.currentPage.id,App.ViewingPageOf,function(onSuccess)
{
if(onSuccess)
{
document.location.href=SITE_PREFIX;}},
function(exception)
{
PageflakesUtility.dumpException(exception);});},
getRandomPublicPage:function()
{
App.Server.GetRandomPageUrlFromRepository(function(success)
{
document.location.href=success;},
function(exception)
{
PageflakesUtility.dumpException(exception);});},
boomarkPage:function()
{
PublicPageHeaderClass.performBookmark();},
performBookmark:function()
{
App.Server.BookmarkPageForUser(App.currentPage.id,App.ViewingPageOf,function(result)
{
document.location.href=SITE_PREFIX;},
function(exception)
{
PageflakesUtility.dumpException(exception);});},
initializeProfile:function()
{
$(PUBLIC_PAGE_HEADER_OWNER).innerHTML="<a href=\""+SITE_PREFIX+"Community/Profile.aspx"+"?profile="+escape(App.My.UniqueName)+"\">"+App.ViewingPageOf+"</a>'s Pagecast";}};
var Events=['OnTimeZoneChange','OnColumnLayoutChange','OnLocationChange'];
Events['OnTimeZoneChange']=[];
Events['OnLocationChange']=[];
Events.OnTimeZoneChange.raise=function(eventName,eventArg){};
var BLIZZARD_WELCOME="Welcome to the new Pageflakes! We've made some changes - <a title=\"click here to learn more\" target=\"_blank\" href=\"Community/Info/Blizzard.aspx\" onclick=\"hideMessage();return true;\" >click here to learn more!</a>"
var MODULE_CONTAINER='body';
var Log={
items:[],add:function(item){Log.items.add(item);},clear:function(){items=[];}};
function $module(id){return App.currentPage.modules[id];}
function ModuleLoader(module)
{
this.module=module;}
ModuleLoader.prototype={
load:function(arg)
{
if(arg)
this.onRequestComplete(arg);
else
App.Server.GetPage(this.module.id,this.module.url,F(this,this.onRequestComplete));},
onRequestComplete:function(arg)
{
if(!P.loadPage(arg,this.module.body))
{
App.addError("Cannot download the module: "+this.module.url);
return;}
P.afterLoad(this.module,arg);
MLC.addSubscriber(this.module);
this.module=null;}}
var Drag={"obj":null,"init":function(a,aRoot,ee){
if(ee==null){
a.onmousedown=Drag.start;}
a.root=aRoot;
if(isNaN(parseInt(a.root.style.left)))a.root.style.left="0px";
if(isNaN(parseInt(a.root.style.top)))a.root.style.top="0px";
a.root.onDragStart=new Function();
a.root.onDragEnd=new Function();
a.root.onDrag=new Function();
if(ee!=null){
var b=Drag.obj=a;
ee=Drag.fixE(ee);
var c=parseInt(b.root.style.top);
var d=parseInt(b.root.style.left);
b.lastMouseX=ee.clientX;
b.lastMouseY=ee.clientY;
document.onmousemove=Drag.drag;
document.onmouseup=Drag.end;}},"start":function(a){
var b=Drag.obj=this;
a=Drag.fixE(a);
var c=parseInt(b.root.style.top);
var d=parseInt(b.root.style.left);
b.dragStartCalled=false;
b.lastMouseX=a.clientX;
b.lastMouseY=a.clientY;
document.onmousemove=Drag.drag;
document.onmouseup=Drag.end;
return false;},"drag":function(a){
a=Drag.fixE(a);
var b=Drag.obj;
var c=a.clientY;
var d=a.clientX;
var e=parseInt(b.root.style.top);
var f=parseInt(b.root.style.left);
var h,g;
h=f+d-b.lastMouseX;
g=e+c-b.lastMouseY;
b.root.style.left=h+"px";
b.root.style.top=g+"px";
b.lastMouseX=d;
b.lastMouseY=c;
if(!b.dragStartCalled)
{
b.root.onDragStart(h,g,a.clientX,a.clientY);
b.dragStartCalled=true;}
else b.root.onDrag(h,g,a.clientX,a.clientY);
return false;},"end":function(){
document.onmousemove=null;
document.onmouseup=null;
Drag.obj.root.onDragEnd(parseInt(Drag.obj.root.style.left),parseInt(Drag.obj.root.style.top));
Drag.obj=null;},"fixE":function(a){
if(typeof a=="undefined")a=window.event;
if(typeof a.layerX=="undefined")a.layerX=a.offsetX;
if(typeof a.layerY=="undefined")a.layerY=a.offsetY;
return a;}};
var DragHandler=
{
onDrag:function(x,y,mx,my){},
onDragStart:function(x,y,mx,my){},
onDragEnd:function(x,y){}};
var TM=
{
setTooltip:function(item,text,delay)
{
if(isNaN(delay))delay=1;
var content=text.replace(/'/g,"\\'").replace(/\n/g,' ').replace(/\r/g,' ');
item.onmouseoverCallback=Func("TM.onmouseover(event, this, '"+content+"', "+delay+"); $stopBubble(event);");
item.onmouseoutCallback=Func("TM.onmouseout(event, "+delay+");  $stopBubble(event);");
item.onmousemoveCallback=Func("TM.onmousemove(event);  $stopBubble(event);");
$addEvent(item,'mouseover',item.onmouseoverCallback);
$addEvent(item,'mouseout',item.onmouseoutCallback);
$addEvent(item,'mousemove',item.onmousemoveCallback);},
onmouseover:function(){},
onmouseout:function(){},
onmousemove:function(){},
unset:function(){},
hideTooltip:function(){}};
var TooltipManager=TM;
var SharingStatus={NotShared:0,Readonly:1,AllowEdit:2,Full:65535};
function Page(id,index,title,columnCount,isNew,pageTheme)
{
this.id=id;
this.index=index;
this.title=title;
this.columnCount=columnCount;
this.IsPublished=false;
this.IsShared=false;
this.IsOwner=true;
this.OwnerName="";
this.OwnerFullname="";
this.sharingStatus=SharingStatus.NotShared;
this.versionNo=0;
this.pageTheme=pageTheme;
this.CanMoveFlakes=false;
this.CanAddFlake=false;
this.CanEditFlake=false;
this.CanDeleteFlake=false;
this.CanChangeFlake=false;
this.CanRemovePage=false;
this.CanChangePage=false;
this.CanInviteOthers=false;
this.columnSizes=[];
this.isLoaded=false;
this.isNew=isNew;
this.modules=null;
this.columns=null;
this.modulePageParts=[];
this.isNewlyShared=false;
this.sharedBy='';
this.hasChanged=false;
this.table=null;}
Page.prototype={
dispose:function()
{
for(var i=0;i<this.modules.length;i++)
{
var module=this.modules[i];
if(typeof module.dispose=="function")module.dispose();}
this.table=null;
delete this.modules;
delete this.columns;
delete this.modulePageParts;
delete this.columnSizes;},
initializeColumns:function()
{
this.columns=[];
for(var i=0;i<this.columnCount;i++)
{
if(this.columnSizes[i])
this.columns[i]={div:null,modules:[],width:this.columnSizes[i]}
else
{
this.columnSizes[i]=parseInt(100/this.columnCount)+"%";
this.columns[i]={div:null,modules:[],width:this.columnSizes[i]}}}},
initializeLayout:function()
{
for(var i=0;i<this.columnCount;i++)
{
if(this.columnSizes[i])
this.columns[i].width=this.columnSizes[i];
else
{
this.columnSizes[i]=parseInt(100/this.columnCount)+"%";
this.columns[i].width=this.columnSizes[i];}}},
initializeModules:function()
{
this.modules=[];
this.modulePageParts=[];},
buildPageOnly:function(pageDef)
{
this.id=pageDef.ID;
this.versionNo=pageDef.VersionNo;
if(this.id>0)this.isNew=false;
this.index=pageDef.OrderNo;
this.title=pageDef.Name
this.columnCount=pageDef.ColumnCount;
this.IsPublished=pageDef.IsPublished;
this.IsShared=pageDef.IsShared;
this.IsOwner=pageDef.IsOwner;
this.OwnerName=pageDef.OwnerName;
this.OwnerFullname=pageDef.OwnerFullname;
this.sharingStatus=pageDef.SharingStatus;
this.pageTheme=pageDef.Theme;
this.hitCount=pageDef.HitCount;
this.CanMoveFlakes=pageDef.CanMoveFlakes;
this.CanAddFlake=pageDef.CanAddFlake;
this.CanEditFlake=pageDef.CanEditFlake;
this.CanDeleteFlake=pageDef.CanDeleteFlake;
this.CanChangeFlake=pageDef.CanChangeFlake;
this.CanChangePage=pageDef.CanChangePage;
this.CanRemovePage=pageDef.CanRemovePage;
this.CanInviteOthers=pageDef.CanInviteOthers;
this.columnSizes=pageDef.ColumnSizes.split(',');
this.isNewlyShared=pageDef.IsNewlyShared;
this.sharedBy=pageDef.SharedBy;
this.hasChanged=pageDef.HasChanged;},
buildModules:function(modules,pageParts)
{
this.modules=modules==null?[]:modules;
this.modulePageParts=pageParts==null?[]:pageParts;
this.initializeColumns();
for(var i=0;i<this.modules.length;i++)
{
var module=this.modules[i];
if(this.columns[module.col]!=null)
this.columns[module.col].modules.push(module);
else
this.columns[0].modules.push(module);}},
build:function(pageDef)
{
this.buildPageOnly(pageDef);
this.buildModules(pageDef.Modules,pageDef.PageParts);},
setColumns:function(columnNo,sizes)
{
if(columnNo<this.columnCount)
{
for(var col=columnNo;col<this.columnCount;col++)
P.moveModules(this.id,col,columnNo-1);
var columnCount=this.columnCount;
for(var col=columnNo;col<columnCount;col++)
P.removeColumn(this.id,this.columnCount-1);}
else if(columnNo>this.columnCount)
{
for(var col=this.columnCount;col<columnNo;col++)
P.addNewColumn(this.id);}
this.columnCount=columnNo;
P.setColumnWidth(this.id,sizes);
P.saveLayoutNow(this);},
show:function()
{
App.currentPage=this;
P.setPage(this);
TabManager.refresh();},
setTitle:function(text)
{
if($trim(text)=="")text=Lang.UNTITLED;
this.title=text;
if(TabManager)TabManager.refresh();},
save:function()
{
var p=this.clone();
var newPage=this.isNew;
App.Server.SavePage(p,F(this,function(page)
{
this.buildPageOnly(page);
if(newPage)
{
this.initializeModules();
this.initializeLayout();
P.updateCurrentPage(this.id);
this.isLoaded=true;}
else
{}
TabManager.create();}));},
clone:function()
{
var p={id:this.id,index:this.index,title:this.title,columnCount:this.columnCount,
columnSizes:this.columnSizes,pageTheme:this.pageTheme};
return p;},
remove:function()
{
var myPageCount=0;
for(var i=0;i<App.pages.length;i++)
if(App.pages[i].IsOwner)myPageCount++;
if(myPageCount==1&&this.IsOwner==true)
{
alert(Lang.CANT_DEL_LAST_PAGE);}
else
{
if(this.IsOwner==true)
{
if((this.modules!=null)&&(this.modules.length>0))
{
for(var count=0;count<this.modules.length;count++)
{
var moduleId=this.modules[count].id;
if(!this.modules[moduleId].canClose())
{
return;}}}
if((this.modules!=null)&&(this.modules.length>0))
{
for(var count=0;count<this.modules.length;count++)
{
var moduleId=this.modules[count].id;
if(!this.modules[moduleId].close(true))
{
return;}}}}
var id=this.id;
var i=App.removePageById(id);
TabManager.create();
App.pages[i].show();
App.Server.RemovePage(id,function(){});}},
addModule:function(module)
{
var newModules=[];
var copyIndex=0;
var modules=this.columns[module.col].modules;
for(var i=0;i<module.row;i++)
{
newModules[copyIndex++]=modules[i];}
newModules[copyIndex++]=module;
for(var i=module.row;i<modules.length;i++)
{
newModules[copyIndex++]=modules[i];}
for(var i=0;i<newModules.length;i++)
newModules[i].row=i;
this.columns[module.col].modules=newModules;
var index=-1;
for(var i=0;i<this.modules.length;i++)
{
if(this.modules[i].id==module.id)
{
index=i;break;}}
if(index==-1)this.modules.push(module);
this.modules[module.id]=module;},
removeModule:function(moduleId)
{
var index=-1;
for(var i=0;i<this.modules.length;i++)
if(this.modules[i].id==moduleId)
{
index=i;break;}
if(index==-1)return;
var module=this.modules[index];
if(module.col!=-1)
{
var newModules=[];
var copyIndex=0;
var modules=this.columns[module.col].modules;
for(var i=0;i<modules.length;i++)
{
if(modules[i].id!=module.id)
newModules[copyIndex++]=modules[i];}
for(var i=0;i<newModules.length;i++)
newModules[i].row=i;
this.columns[module.col].modules=newModules;}
this.modules.removeAt(index);
this.modules[moduleId]=null;}};
function Module(id,row,column,title,url,expanded,internalId,pageId,containerPage)
{
this.id=id;
this.row=row;
this.col=column;
this.title=title;
this.url=url;
this.expanded=expanded;
this.internalId=internalId;
this.pageId=pageId;
this.temp=false;
this.loaded=false;
this.icon="";
this.isDirty=false;
this.dragging=false;
this.page=containerPage;
this.hasBasicEditArea=false;
this.divId=null;
this.titleId=null;
this.bodyId=null;
this.editId=null;
this.editLinkId=null;
this.closeLinkId=null;
this.handleId=null;
this.editContainerId=null;
this.editBodyId=null;
this.contentContainerId=null;
this.refreshLinkId=null;
this.infoId=null;
this.closed=false;
this.number=0;
this.div=null;
this.titleDiv=null;
this.handleDiv=null;
this.body=null;
this.edit=null;
this.editContainer=null;
this.editBody=null;
this.contentContainer=null;
this.editLink=null;
this.closeLink=null;
this.infoLink=null;
this.editTitleBox=null;
this.numberDiv=null;
this.dragStart=function(x,y){}
this.dragOver=function(x,y){}
this.dragEnd=function(x,y){}
this.dragStart2=function(x,y){}
this.dragOver2=function(x,y){}
this.dragEnd2=function(x,y){}
this.flakeAdded=function(){}
this.alreadyTriedLoadingFavicon=false;}
Module.prototype={
showFlakeMenu:function()
{
var menu=$('sendFlakeOptionsMenu');
menu.flakeId=this.id;
FlakeMenu.init();},
_deleteInstance:function()
{
try{eval("delete "+this.id);}
catch(x){}},
disableBasicSetting:function()
{
var basicId='tab_basic'+this.id;
var item=$(basicId);
if(item!=null&&!item.disabled)
{
item.disabled=true;
var disableCode=item.getAttribute("disable");
eval(disableCode);}},
showBasicSetting:function()
{
$D('editBody'+this.id);
$ND('editOthers'+this.id);
var basicId='tab_basic'+this.id;
if($(basicId)!=null)$(basicId).className='edit_tabup';
var otherId='tab_other'+this.id;
if($(otherId)!=null)$(otherId).className='edit_tabdown';},
showAdvancedSetting:function()
{
var editOthers=$('editOthers'+this.id);
if(null==editOthers)return;
$D(editOthers);
$ND('editBody'+this.id);
var tabOther=$('tab_other'+this.id);
if(tabOther)tabOther.className='edit_tabup';
var tabBasic=$('tab_basic'+this.id);
if(tabBasic)tabBasic.className='edit_tabdown';
this.editTitleBox.value=this.title;},
publish:function()
{
if(App.IsAnonymous)
{
alert(Lang.EXPORT_REQUIRES_SIGNUP);
return;}
if(!this.page.IsPublished&&!this.page.IsShared)
{
App.confirm(Lang.EXPORT_FLAKE_CONFIRM,Lang.EXPORT_FLAKE_CONFIRM_YES,Lang.EXPORT_FLAKE_CONFIRM_NO,F(this,function()
{
PU.blockUI();
PU.setBusy();
App.Server.PublishPage(this.page.id,this.page.title,"","","",false,false,F(this,function(result)
{
this.page.IsPublished=true;
TabManager.refresh();
App.ExportingFlakeInstanceId=this.internalId;
App.showFlakeExport();
PU.setIdle();},function()
{
$showMsg("There was an error while making the page public. Please try again");
PU.setIdle();}));}));}
else
{
App.ExportingFlakeInstanceId=this.internalId;
App.showFlakeExport();}},
getInstance:function()
{
var getInstanceScript="(typeof "+this.id+" != 'undefined' ) ? "+this.id+":"+"window."+this.id+" = window.$"+this.id+"()";
var instance=eval(getInstanceScript);
return instance;},
GetRows:function(spName,parameters,successCallback,failureCallback)
{
var paramStr="";
for(var i=0;i<parameters.length;i++)
{
paramStr+=parameters[i]+"|";}
DataServices.GetRows(this.internalId,App.UserGUID,spName,paramStr,successCallback,failureCallback);},
GetRows2:function(spName,parameters,successCallback,failureCallback)
{
DataServices.GetRows2(this.internalId,App.UserGUID,spName,parameters,successCallback,failureCallback);},
ExecuteSP:function(spName,parameters,successCallback,failureCallback)
{
var paramStr="";
for(var i=0;i<parameters.length;i++)
{
paramStr+=parameters[i]+"|";}
DataServices.ExecuteSP(this.internalId,App.UserGUID,spName,paramStr,successCallback,failureCallback);},
ExecuteSP2:function(spName,parameters,successCallback,failureCallback)
{
DataServices.ExecuteSP2(this.internalId,App.UserGUID,spName,parameters,successCallback,failureCallback);},
resolve:function()
{
if(this.div==null)this.div=$("module"+this.id);
this.divId="module"+this.id;
this.titleId='title'+this.id;
this.titleDiv=$(this.titleId);
this.handleId='handle'+this.id;
this.handleDiv=$(this.handleId);
this.tooltip=this.title;
this.bodyId='body'+this.id;
this.body=$(this.bodyId);
this.editLinkId='editLink'+this.id;
this.editLink=$(this.editLinkId);
if(this.editLink!=null)
if(!this.page.CanEditFlake)
{
$addEvent(this.editLink,'click',Func("alert(App.ViewingPageOf + Lang._THE_OWNER_CAN_ADD);"));
$ND(this.editLink);}
this.closeLinkId='closeLink'+this.id;
this.closeLink=$(this.closeLinkId);
if(this.closeLink!=null)
if(!this.page.CanDeleteFlake)
$ND(this.closeLink);
this.collapseLinkId='collapseLink'+this.id;
this.collapseLink=$(this.collapseLinkId);
this.expandLinkId='expandLink'+this.id;
this.expandLink=$(this.expandLinkId);
this.refreshLinkId='refresh'+this.id;
this.editId=this.id+'edit';
this.editContainerId='editContainer'+this.id;
this.editBodyId='editBody'+this.id;
if(this.page.CanMoveFlakes)
{
this.drag=Drag.init(this.handleDiv,this.div);
this.div.onDrag=F(this,function(x,y,mx,my){DragHandler.onDrag(this,x,y,mx,my);});
this.div.onDragStart=F(this,function(x,y,mx,my){DragHandler.onDragStart(this,x,y,mx,my);});
this.div.onDragEnd=F(this,function(x,y){DragHandler.onDragEnd(this,x,y);});}
else
{
this.handleDiv.style.cursor="default";}},
saveTitleBox:function()
{
if(null==this.editTitleBox)return;
this.setTitle(this.editTitleBox.value);
this.closeTitleBox();
this.isDirty=true;
this.save();
eval("if( typeof "+this.id+" != 'undefined' ) if( typeof "+this.id+".onTitleChange == 'function') "+this.id+".onTitleChange();");},
closeTitleBox:function()
{
this.toggleEdit();},
startEdit:function()
{},
setNumber:function(number)
{
this.number=number;
if(null==this.numberDiv)this.numberDiv=$('number'+this.id);
if(number>0)
this.numberDiv.innerHTML="("+number+")";
else
this.numberDiv.innerHTML="";
$visible(this.numberDiv);},
clearNumber:function()
{
this.number=number;
if(null==this.numberDiv)this.numberDiv=$('number'+this.id);
$hide(this.numberDiv);},
editEdit:function()
{
this.saveTitleBox();},
refresh:function()
{
var instance=this.getInstance();
if(null!=instance)instance.refresh();},
enableRefresh:function()
{
$D(this.refreshLinkId);},
disableRefresh:function()
{
$ND(this.refreshLinkId);},
showEditArea:function()
{
if(this.page.CanEditFlake)
{
var className=$(this.editLinkId).className;
if(className.indexOf(' ')>0)
{
hoverClassName="settings_icon settings_icon_open";
$(this.editLinkId).className="settings_icon settings_icon_open settings_icon_open_hover";}
else
{
$(this.editLinkId).className="settings_icon settings_icon_open";}
if(this.hasBasicEditArea)
{
this.showBasicSetting();}
else
{
this.disableBasicSetting();
this.showAdvancedSetting();}
$D(this.editContainerId);
if(this.expanded)$ND(this.bodyId);
this.resize();}},
hideEditArea:function()
{
if(!this.page.CanEditFlake)return;
if($isVisible(this.editContainerId))
{
var className=$('editLink'+this.id).className;
if(className.indexOf('settings_icon_open_hover')>0)
$('editLink'+this.id).className="settings_icon settings_icon_hover";
else
$('editLink'+this.id).className="settings_icon";}
hoverClassName="settings_icon";
$ND(this.editContainerId);
if(this.expanded)$D(this.bodyId);
this.resize();},
toggleEdit:function()
{
if(!this.page.CanEditFlake)return;
this.editTitleBox=$('flakeTitleEdit'+this.id);
this.headerLinkSwitch();
if($isVisible(this.editContainerId))
this.hideEditArea();
else this.showEditArea();
this.resize();},
headerLinkSwitch:function()
{
this.editContainer=$(this.editContainerId);
if(this.editContainer!=null&&this.editContainer.style.display=="none")
{
T(this.editLink,Lang.END_EDIT);}
else
{
T(this.editLink,Lang.EDIT);}},
resize:function()
{
App.resize();},
canClose:function()
{
if(typeof this.beforeClose=='function')
if(!this.beforeClose())return false;
return true;},
close:function(force)
{
if(!force&&!this.temp)
if(typeof this.beforeClose=='function')
if(!this.beforeClose())return false;
if(this.temp||force||confirm(Lang.SURE_REMOVE_+T(this.titleDiv)+Lang._NO_UNDO))
{
this.closed=true;
eval("if( typeof "+this.id+" != 'undefined' ) if( typeof "+this.id+".onclose == 'function') "+this.id+".onclose();");
var page=this.page;
this.removeFromPage();
App.Server.RemoveModule(this.internalId);
P.saveLayout(page);}
return true;},
dispose:function()
{
$clearEvent(this.editLink);
$clearEvent(this.titleDiv);
$clearEvent(this.expandLink);
$clearEvent(this.collapseLink);
this.page=
this.div.onDrag=this.div.onDragStart=this.div.onDragEnd=this.hasBasicEditArea=this.divId=
this.titleId=this.bodyId=this.editId=this.editLinkId=this.closeLinkId=this.handleId=this.editContainerId=
this.editBodyId=this.contentContainerId=this.refreshLinkId=this.infoId=this.closed=this.number=
this.expandLink=this.closeLink=
this.div=this.titleDiv=this.handleDiv=this.body=this.edit=this.editContainer=this.editBody=
this.contentContainer=this.editLink=this.closeLink=this.infoLink=this.editTitleBox=this.numberDiv=
this.dragStart=this.dragOver=this.dragEnd=this.dragStart2=this.dragOver2=this.dragEnd2=this.flakeAdded=null;
this._deleteInstance();},
removeFromPage:function()
{
this.page.removeModule(this.id);
$remove(this.div);
$fixTable(this.page.table);
this.dispose();},
_:function(key)
{
var returnText=key;
try
{
returnText=this.texts[key]}
catch(e)
{
debug.dump('Cannot translate: '+key);}
return returnText;},
setEditArea:function(content)
{
this.editBody=$(this.editBodyId);
this.editBody.innerHTML=content;
this.edit=this.editBody;
this.hasBasicEditArea=true;},
setTitle:function(title)
{
if(title=="")title="(untitled)";
this.title=title;
this.titleDiv.innerHTML=this.title;},
setIcon:function(iconUrl)
{
$("icon"+this.id).src=iconUrl;},
save:function(successCallback,failureCallback)
{
App.startWork(this.id);
var m=this.clone();
m.isDirty=true;
P.saveModule(this.pageId,m,successCallback,failureCallback);},
cloneShallow:function()
{
var m={id:this.id,
row:this.row,
col:this.col,
title:this.title,
url:this.url,
expanded:this.expanded,
internalId:this.internalId,
pageId:this.pageId,
temp:this.temp,
isDirty:this.isDirty}
return m;},
clone:function()
{
var m=this.cloneShallow();
m.Profiles=this.Profiles;
m.PrivateProfiles=this.PrivateProfiles;
m.ProtectedProfiles=this.ProtectedProfiles;
m.PublicProfiles=this.PublicProfiles;
return m;},
collapse:function()
{
if(!this.expanded)return;
this.expanded=false;
$ND(this.collapseLinkId);
$D(this.expandLinkId);
var pos=PU.getPosition(this.body);
this.bodyHeight=pos[3];
this.body.style.overflow="hidden";
this.body.style.position="relative";
var _me=this;
_me.i=0;
_me.body.oldPadding=_me.body.style.padding;
this.si=setInterval(F(this,this.collapseAnimation),50);
this.resize();
this.isDirty=true;
P.saveLayout(this.page);},
collapseAnimation:function()
{
var h=PU.getPosition(this.body)[3];
this.body.style.height=(h/2)+"px";
this.body.style.padding="0px";
if(h<5||this.i++>20)
{
clearInterval(this.si);
this.body.style.overflow="";
this.body.style.height="";
this.body.style.position="";
if(this.body.oldPadding)
this.body.style.padding=this.body.oldPadding;
else
this.body.style.padding="";
$ND(this.bodyId);}},
expand:function()
{
if(this.expanded)return;
this.expanded=true;
$D(this.collapseLinkId);
$ND(this.expandLinkId);
var _me=this;
$D(this.bodyId);
_me.targetHeight=PU.getPosition(this.body)[3];
_me.i=0;
this.body.style.overflow="hidden";
this.body.style.height="0px";
_me.si=setInterval(F(this,this.expandAnimation),50);
this.resize();
this.isDirty=true;
P.saveLayout(this.page);},
expandAnimation:function()
{
var h=PU.getPosition(this.body)[3];
this.body.style.height=(this.targetHeight+h)/2+"px";
if((this.targetHeight-h)<5||this.i++>20)
{
clearInterval(this.si);
this.body.style.height="";
this.body.style.overflow="";}},
Build:function(moduleDef)
{
this.id=moduleDef.id;
this.row=moduleDef.row;
this.col=moduleDef.col;
this.title=moduleDef.title;
this.url=moduleDef.url;
this.expanded=moduleDef.expanded;
this.internalId=moduleDef.internalID;
this.pageId=moduleDef.pageID;
this.Profiles=moduleDef.Profiles;
this.PrivateProfiles=moduleDef.PrivateProfiles;
this.ProtectedProfiles=moduleDef.ProtectedProfiles;
this.PublicProfiles=moduleDef.PublicProfiles;},
loadDefaultFavicon:function(imgId)
{
if(!this.alreadyTriedLoadingFavicon)
{
this.alreadyTriedLoadingFavicon=true;
if(this.url.indexOf('_RSSFEED_')>0)
{
$(imgId).src=IMAGE_PREFIX+"images/rss.jpg";}
else
{
$(imgId).src=IMAGE_PREFIX+"images/pficon.gif";}}}};
var MQ=
{
delays:[],
timerIDs:[],
add:function(id,delay,resetIfExist,func)
{
var queue=MQ.delays[delay];
if(null==queue)queue=[];
if(null==queue[id])
{
queue[id]={id:id,code:func,reset:false};}
else
{
if(resetIfExist){queue[id]={id:id,code:func,reset:true};}
else{return;}}
MQ.delays[delay]=queue;
if(MQ.timerIDs[delay]==null)
{
MQ.timerIDs[delay]=window.setTimeout(function()
{
MQ.execute(delay);},delay);}},
execute:function(delay)
{
var delayQueue=MQ.delays[delay];
for(var key in delayQueue)
{
var item=delayQueue[key];
if(item!=null)
{
if(typeof item.code=="function")
{
if(!item.reset)
{
delayQueue[key]=null;
item.code();
delete item.code;}
else
{
item.reset=false;}}}}
var allCallbackCalled=true;
for(var key in delayQueue)
{
var item=delayQueue[key];
if(item!=null)
{
if(typeof item.code=="function")
{
allCallbackCalled=false;}}}
if(allCallbackCalled)
{
delete delayQueue;
MQ.delays[delay]=null;
delete MQ.delays[delay];
window.clearTimeout(MQ.timerIDs[delay]);
MQ.timerIDs[delay]=null;
delete MQ.timerIDs[delay];}
else
{
MQ.timerIDs[delay]=window.setTimeout(function()
{
MQ.execute(delay);},delay);}},
exist:function(id,delay)
{
var queue=MQ.delays[delay];
if(null==queue)queue=[];
return(null!=queue[id]);},
remove:function(id,delay)
{
var queue=MQ.delays[delay];
if(null==queue)return;
else queue[id]=null;
MQ.delays[delay]=queue;}}
var MethodQueue=MQ;
var MLC=ModuleLoaderCallback={
subscribers:[],
waitForScriptLoadTimerID:0,
loadModuleTimerID:0,
counter:0,
addSubscriber:function(module)
{
if(MLC.waitForScriptLoadTimerID==0)
MLC.waitForScriptLoadTimerID=window.setInterval(MLC.waitForScriptLoad,100);
MLC.subscribers.push(module);
MLC.counter=0;},
waitForScriptLoad:function()
{
MLC.counter++;
if(MLC.counter==600)
{
window.clearInterval(MLC.waitForScriptLoadTimerID);
MLC.waitForScriptLoadTimerID=0;
$showMsg(Lang.COMMON_ERROR_ALERT,10000);
return;}
var isLoading=false;
if(Browser.isFirefox||Browser.isSafari)
{
isLoading=P.loadingScripts.length>0;}
else
{
for(var i=0;i<document.scripts.length;i++)
{
var script=document.scripts[i];
if(script.src!=null&&script.src!="")
{
if(script.readyState!="loaded"&&script.readyState!="complete")
isLoading=true;}}}
if(isLoading)
{}
else
{
window.clearInterval(MLC.waitForScriptLoadTimerID);
MLC.waitForScriptLoadTimerID=0;
MLC.subscribers.reverse();
MLC.loadModule();}},
loadModule:function()
{
if(MLC.subscribers.length>0)
{
var module=MLC.subscribers.pop();
module.loaded=true;
if(MLC.loadModuleTimerID==0)
MLC.loadModuleTimerID=window.setInterval(MLC.loadModule,20);
try
{
var instance=module.getInstance();
if(null!=instance&&typeof instance.load=='function')
{
try
{
instance.load(module);}
catch(exception)
{
var msg="Error occured while loading: '"+module.title+"' from:\n"+module.url+"\n\n"+exception.message+"\n\n";
if(module.body!=null)
msg+=module.body.innerHTML;
else
msg+="Body was not loaded properly. That's why code cannot run.";
App.addError(msg);}}}
catch(exception){var a=exception.message;}}
else
{
window.clearInterval(MLC.loadModuleTimerID);
MLC.loadModuleTimerID=0;}}};
var SearchEngineEnum={Google:0,Yahoo:1,MSN:2};
var App={
UserFullName:"",
UserUniqueName:"",
UserGUID:"",
IsAnonymous:true,
UserPublishURL:"",
ViewingPageOf:"",
IsMySite:true,
lastPreviewModule:null,
PageSharedWithMeCount:0,
ShowSearchBar:true,
SearchEngineType:SearchEngineEnum.Google,
DomainID:0,
LanguageID:0,
My:{Interests:[],SpecificInterests:"",Country:"",City:"",State:"",Timezone:0,Profile:new Array(),FirstName:"",LastName:"",ZipCode:""},
ExportingFlakeInstanceId:0,
InvitePublicPageurl:'',
Server:{},
pages:[],
currentPage:null,
dropPlaceholder:null,
loaded:false,
errors:[]};
App.addError=function(msg)
{
var url=document.location.href;
if(App.errors.length>0)if(App.errors[App.errors.length-1]==msg)return;
App.errors.add(msg);}
App.startWork=App.endWork=App.resize=function(){}
App.refreshPage=function(){document.location.reload(true);}
App.getPageById=function(id)
{
for(var i=0;i<App.pages.length;i++)
if(App.pages[i].id==id)
return App.pages[i];
return null;}
App.onServiceCallFail=function(exception,response,userContext)
{}
App.initApp=function(pi)
{
ContentProxy.set_defaultFailedCallback(App.onServiceCallFail);
CoreServices.set_defaultFailedCallback(App.onServiceCallFail);
DataServices.set_defaultFailedCallback(App.onServiceCallFail);
RssServices.set_defaultFailedCallback(App.onServiceCallFail);
AddContentWS.set_defaultFailedCallback(App.onServiceCallFail);
VisitorCounterService.set_defaultFailedCallback(App.onServiceCallFail);
App.Template=pi.Template;
App.IsSubscribedForNewsletter=pi.IsSubscribedForNewsletter;
App.UserFullName=pi.UserFullName;
App.UserUniqueName=pi.UserUniqueName;
App.UserGUID=pi.UserGUID;
App.UserVersionNo=pi.UserVersionNo;
App.VersionSuffix=pi.VersionSuffix;
App.IsAnonymous=pi.IsAnonymous;
App.UserPublishURL=pi.UserPublishURL;
App.ViewingPageOf=pi.ViewingPageOf;
App.IsMySite=pi.IsMySite;
App.PageSharedWithMeCount=pi.PageSharedWithMeCount;
App.OpenLinksIn=pi.OpenLinksIn;
App.ShowSharedPagesWithMine=pi.ShowSharedPagesWithMine;
App.DownloadFeedsAutometically=pi.DownloadFeedsAutometically;
App.ShowSearchBar=pi.ShowSearchBar;
App.SearchEngineType=pi.SearchEngine;
App.DomainID=pi.DomainID;
App.LanguageID=pi.LanguageID;
App.My=pi.My;
App.Location=App.getLocationVariable();
App.pages=[];
if(null!=pi.Pages)
for(var i=0;i<pi.Pages.length;i++)
{
var pageDef=pi.Pages[i];
var page=new Page();
page.build(pageDef);
App.pages[i]=page;}
for(var i=0;i<App.pages.length;i++)
if(App.pages[i].id==pi.CurrentPageID)
{
App.currentPage=App.pages[i];
App.currentPage.isLoaded=true;}
if(!App.IsMySite)
{
if(!App.IsCompactFramework)PublicPageHeaderClass.init();
document.title="Pageflakes - "+App.currentPage.title;}}
App.getModuleHtml=function(module)
{
var html=App.Template.ModuleHtml;
html=html.replace(/_FLAKE_ID_/g,module.id);
html=html.replace(/_FLAKE_TITLE_/g,(""+module.title));
html=html.replace(/_FLAKE_URL_/g,module.url);
if(module.expanded)html=html.replace(/_FLAKE_EXPANDED_/g,"display:none");
else html=html.replace(/_FLAKE_COLLAPSED_/g,"display:none");
return html;}
App.getPopupHtml=function(id,title)
{
var html=App.Template.PopupHtml;
html=html.replace(/_FLAKE_ID_/g,id);
html=html.replace(/_FLAKE_TITLE_/g,title);
return html;}
App.getLocationVariable=function()
{
var loc='';
if(App.My.City!=null&&App.My.City!='')
loc+=App.My.City+', ';
if(App.My.State!=null&&App.My.State!='')
loc+=App.My.State+', ';
if(App.My.ZipCode!=null&&App.My.ZipCode!='')
loc+=App.My.ZipCode+', ';
if(App.My.Country!=null&&App.My.Country!='')
loc+=App.My.Country;
return loc;}
App.showPageflakes=function(pageflakeInfo,currentPageContent)
{
l.startShowPageflakes=new Date();
App.initApp(pageflakeInfo);
if(!App.ShowSearchBar)SearchForm.close(true);
setTimeout("RC.startCachingFeeds()",10*60*1000);
P.refreshMenu();
if(App.pages.length==0)
{
$showMsg(Lang.NO_PAGE_TO_ViEW);
return;}
if(currentPageContent)
{
App.currentPage.buildModules(currentPageContent.Modules,currentPageContent.PageParts);
App.currentPage.isLoaded=true;}
$(MODULE_CONTAINER).innerHTML="";
P.initializeLayout(App.currentPage,App.currentPage.modules);
P.setPage(App.currentPage,true);
$DC(function()
{
P.populateModuleWithContent(App.currentPage,App.currentPage.modulePageParts);
P.showPage(true);
l.endShowPageflakes=new Date();
if(App.UserVersionNo>0)
{
var page=P.currentPage;
if(page.IsPublished==true&&page.IsOwner==false)
{}
else
{
RssServices.GetRSSChannelList(function(channels)
{
RC.cacheAllSubscribedChannelSummary(channels);});}}
window.setTimeout(RC.cacheAllSavedRssItem,3000);
App.loaded=true;
if(typeof SF!="undefined")SF.initialize();});}
var P={
currentPage:null,
loadingScripts:[],
xmlHttpCallCounter:0,
startXmlHttpCall:function()
{
P.xmlHttpCallCounter++;
PU.showProgress();
MQ.add('P.endXmlHttpCall',120000,true,P.endXmlHttpCall);},
endXmlHttpCall:function()
{
P.xmlHttpCallCounter--;
if(0>=P.xmlHttpCallCounter){PU.hideProgress();P.xmlHttpCallCounter=0;}},
refreshMenu:function(){},
setPage:function(page,firstLoad)
{
if(P.currentPage==page)
return;
if(null!=P.currentPage)P.hidePage();
P.currentPage=page;
P.showPage(firstLoad);},
updateCurrentPage:function(pageId)
{
if(App.loaded)MQ.add('App.Server.SetCurrentPage',1000,false,function(){App.Server.SetCurrentPage(pageId,function(){})});},
precachePage:function(pageId,versionNo)
{
MQ.add("PrecachePage"+pageId,1500,false,function(){P.precachePageNow(pageId,versionNo);});},
precachePageNow:function(pageId,versionNo)
{
function precache(pageId,versionNo)
{
CoreServices.GetPageContent(App.UserGUID,pageId,versionNo,VERSION_SUFFIX,function(content)
{
if(null==content)
{
CoreServices.GetPageContent(App.UserGUID,pageId,versionNo,VERSION_SUFFIX+"retry");}},function()
{
CoreServices.GetPageContent(App.UserGUID,pageId,versionNo,VERSION_SUFFIX+"retry");});}
if(versionNo==0)
{
function callbackGetPageVersionNo(newVersionNo)
{
var page=App.getPageById(pageId);
page.versionNo=newVersionNo;
precache(pageId,newVersionNo);}
CoreServices.GetPageVersionNo(pageId,callbackGetPageVersionNo,function()
{
CoreServices.GetPageVersionNo(pageId,callbackGetPageVersionNo);});}
else
{
precache(pageId,versionNo);}},
getPage:function()
{
return P.currentPage;},
precacheTheme:function(url,callbackCode)
{
var url=String.format("CacheCss.aspx?css={0}&callback={1}",escape(url),escape(callbackCode));
var iframe=$('ThemeCache')||$$("IFRAME");
iframe.id="ThemeCache";
iframe.style.height="1px";
iframe.style.position="absolute";
$hide(iframe);
iframe.src=url;
document.body.appendChild(iframe);},
applyTheme:function(shortcut,url,refresh)
{
var linkId="pagetheme_"+shortcut;
var link=document.createElement("link");
link.id=linkId;
link.href=url;
link.rel="stylesheet";
link.type="text/css";
var existingLink=$(linkId);
var head=$head;document.getElementsByTagName("head")[0];
var links=document.getElementsByTagName("link");
for(var i=0;i<links.length;i++)
{
if(links[i].id.indexOf("pagetheme_")===0)
{
if(links[i]!=existingLink)
{
$remove(links[i]);}}}
if(null==existingLink)
{
MethodQueue.add('AddNewThemeLink',100,true,function()
{
link.disabled=true;
$head.appendChild(link);},500);
MethodQueue.add('EnableNewTheme',500,true,function()
{
link.disabled=false;});
MethodQueue.add('HideThemePopup',1000,true,function()
{
PU.unblockUI();});}
else
{
if(refresh)
{
link.ID=linkId;
$remove(existingLink);
$DC(function(){$head.appendChild(link);});
link.disabled=false;}
else
{
existingLink.disabled=false;}
PU.unblockUI();}},
setThemeIE6:function(pageTheme,refresh)
{
if(!refresh)PU.blockUI("Changing Theme...");
if(refresh)P.applyTheme(pageTheme.ThemeShortcut,pageTheme.ThemeHandlerUrl,refresh);
else P.precacheTheme(pageTheme.ThemeHandlerUrl,String.format('P.applyTheme("{0}", "{1}", {2})',pageTheme.ThemeShortcut,pageTheme.ThemeHandlerUrl,refresh?"true":"false"));},
setTheme:function(pageTheme,refresh)
{
if(P.previousThemeID==pageTheme.ThemeShortcut&&!refresh)return;
P.previousThemeID=pageTheme.ThemeShortcut;
if(Browser.isIE6)P.setThemeIE6(pageTheme,refresh);
else
if(true)
{
var linkId="pagetheme_"+pageTheme.ThemeShortcut;
var link=document.createElement("link");
link.id=linkId;
link.href=pageTheme.ThemeHandlerUrl;
link.rel="stylesheet";
link.type="text/css";
var existingLink=$(linkId);
var head=$head;document.getElementsByTagName("head")[0];
var links=document.getElementsByTagName("link");
for(var i=0;i<links.length;i++)
{
if(links[i].id.indexOf("pagetheme_")===0)
{
links[i].disabled=true;}}
if(null==existingLink)
{
$head.appendChild(link);}
else
{
if(refresh)
{
$remove(existingLink);
$DC(function(){$head.appendChild(link);});}
else
{
existingLink.disabled=false;}}}},
showPage:function(firstLoad)
{
var page=P.currentPage;
if(!firstLoad)P.setTheme(page.pageTheme);
else P.previousThemeID=page.pageTheme.ThemeShortcut;
if(page.table==null)
P.createPageLayout(page);
P.showAllModules();
if(!page.isNew)
{
if(!page.isLoaded)
{
PageProgress.show();
P.loadPageModules(page,false,P.showPage);}
else
{
PageProgress.hide();}
P.updateCurrentPage(page.id);}
if(!App.IsMySite)
{
document.title="Pageflakes - "+App.currentPage.title;}
if(!page.IsOwner)
{
$hideMsg();
if(!App.currentPage.CanAddFlake)
{
$ND($('PageflakesTV'));
$ND($('Start'));
$ND('StartAnimation');
$ND($('CommunityButton'));}
else
{
$D($('Start'));
$D($('CommunityButton'));}
if(page.IsPublished&&(!page.IsShared))
{
$ND($('searchForm'));}
var urlToOwner=SITE_PREFIX+page.OwnerName;
var link="<a href=\""+urlToOwner+"\">"+page.OwnerFullname+"</a>";
if(page.IsShared)
{
if(page.CanEditFlake)$showMsg(String.format(Lang.SHARED_PAGE_MESSAGE__,link));
else $showMsg(String.format(Lang.SHARED_PAGE_MESSAGE2__,link));}
if(page.isNewlyShared)
{
P.showPageShareAcceptConfirmation(page.OwnerFullname);}}
else
{
$hideMsg();
if(App.My.Profile["BN"]=="1")
{
$showMsg(BLIZZARD_WELCOME);
var a=$('messageBarClose');
a.onclick=function(event)
{
hideMessage();};}
$D($('Start'));
$D($('CommunityButton'));
if(App.ShowSearchBar)
$D($('searchForm'));}
if(typeof TipFactory!='undefined')
{
TipFactory.showTips();}
if(page.IsPublished)
{
PublicPageHeaderClass.showHeader(true);}
else
{
PublicPageHeaderClass.showHeader(false);}},
hidePage:function()
{
P.hideAllModules();},
hideAllModules:function()
{
$ND(P.currentPage.table);},
showAllModules:function(keepHidden)
{
$clearDisplay(P.currentPage.table);
if(keepHidden)$hide(P.currentPage.table);
else $visible(P.currentPage.table);},
createPageLayout:function(page)
{
var trObj;
if(page.table==null)
{
page.initializeColumns();
page.table=$$('TABLE');
page.table.setAttribute("width","100%");
page.table.className="page_table";
page.table.border=0;
var tbodyObj=$$("TBODY");
trObj=$$("TR");
page.table.appendChild(tbodyObj);
tbodyObj.appendChild(trObj);
$(MODULE_CONTAINER).appendChild(page.table);}
else
{
trObj=page.table.firstChild.firstChild;
while(trObj.hasChildren)trObj.removeChild(trObj.firstChild);}
for(var i=0;i<page.columnCount;i++)
{
var td=$$('td');
td.className="column";
trObj.appendChild(td);}
for(var i=0;i<page.columnCount;i++)
{
var colCell=trObj.childNodes[i];
colCell.setAttribute("width",page.columns[i].width);
page.columns[i].div=colCell;}},
loadPage:function(arg,body)
{
if(arg==null)return false;
if(arg.scripts==null)return false;
var head=$head;
var scriptLoader=new ScriptLoader();
for(var i=0;i<arg.scripts.length;i++)
{
var scriptTag=arg.scripts[i];
var existingTag=$(scriptTag.id);
if(existingTag==null)
{
var dtRf=new Date();
if(scriptTag.src==null)
{
if(Browser.isSafari)
{
PU.exec(scriptTag.content);}
else
{
if(Browser.isFirefox)
PU.exec(scriptTag.content);
oScript=$$("script");
oScript.id=scriptTag.id;
oScript.type="text/javascript";
oScript.text=scriptTag.content;
$head.appendChild(oScript);}}
else
{
if(Browser.isSafari)
{
var url=scriptTag.src;
if(url.indexOf("http://")==-1)url=SITE_PREFIX+url;
P.loadingScripts.add(url);
scriptLoader.load_safari(url,P.scriptLoaded);}
else
{
oScript=$$("script");
oScript.id=scriptTag.id;
oScript.type="text/javascript";
oScript.setAttribute("src",scriptTag.src);
$head.appendChild(oScript);
if(Browser.isIE)
{
if(oScript.readyState!="loaded"&&oScript.readyState!="complete")
{
P.loadingScripts.add(oScript.src);
$addEvent(oScript,"readystatechange",function(event)
{
if(this.readyState=="loaded"||this.readyState=="complete")
{
P.loadingScripts.remove(this.src);
$clearEvent(this);}});}}
if(Browser.isFirefox)
{
if(oScript.readyState!="loaded")
{
P.loadingScripts.add(oScript.src);
$addEvent(oScript,"error",function(event)
{
P.loadingScripts.remove(this.src);
$clearEvent(this);});
$addEvent(oScript,"load",function(event)
{
P.loadingScripts.remove(this.src);
$clearEvent(this);});}}}}}}
for(var i=0;i<arg.styles.length;i++)
{
var styleTag=arg.styles[i];
var existingTag=$(styleTag.id);
if(null==existingTag)
{
var dtRf=new Date();
var styleNode;
if(styleTag.href==null)
{
var cssStr=styleTag.content;
styleNode=$$("style");
styleNode.setAttribute("type","text/css");
if(styleNode.styleSheet)
{
styleNode.styleSheet.cssText=cssStr;}else
{
var cssText=document.createTextNode(cssStr);
styleNode.appendChild(cssText);}}
else
{
styleNode=$$("link");
styleNode.setAttribute("type","text/css");
styleNode.setAttribute("rel","stylesheet");
styleNode.setAttribute("href",styleTag.href);}
styleNode.id=styleTag.id;
$head.appendChild(styleNode);
styleNode=null;}}
var prefix="";
var suffix="";
if(arg.body!="")body.innerHTML=arg.body;
return true;},
scriptLoaded:function(script,url)
{
setTimeout(function()
{
PU.exec(script);
P.loadingScripts.remove(url);},100);},
showPageShareAcceptConfirmation:function(name)
{
var accDiv="PageShareAcceptConfirmation";
var div=$(accDiv);
PU.blockUI();
if(div==null)
{
div=$$('div',accDiv);
div.className="popup container";
$('Content').appendChild(div);
if(Browser.isIE6)P.showPageShareAcceptConfirmationBlock();}
else
{
$visible(div);
div.style.zIndex=$('blockUI').style.zIndex+1;}
var txt='<div class="header"></div><div class="content"> <div class="box"><h1>{0} wants to share a page with you.</h1><p>Do you want to accept the page? You can later delete it.</p><div><input class="button" value="Ok" style="width:70px;text-align:center;cursor:pointer;" onclick="P.hidePageShareAcceptConfirmation(true)" type="button" />&nbsp;<input style="width:70px;text-align:center;cursor:pointer;" class="button cancel" value="No, thanks" onclick="P.hidePageShareAcceptConfirmation(false)" type="button"/><p>&nbsp;</p><p>&nbsp;</p></div></div></div>';
div.innerHTML=String.format(txt,name);
PU.centerDiv(div);
return $isVisible(div);},
showPageShareAcceptConfirmationBlock:function()
{
if($isVisible($('PageShareAcceptConfirmation')))
{
window.setTimeout(P.showPageShareAcceptConfirmationBlock,1000);
PU.blockUI();}},
hidePageShareAcceptConfirmation:function(accept)
{
var pageId=App.currentPage.id;
var accDiv="PageShareAcceptConfirmation";
var div=$(accDiv);
if(accept==true)
{
App.currentPage.isNewlyShared=false;
CoreServices.ApproveOrRejectSharedPage(pageId,true);}
else
{
App.currentPage.remove();
CoreServices.ApproveOrRejectSharedPage(pageId,false)}
$hide(div);
PU.unblockUI();},
afterLoad:function(m,pageParts)
{
m.edit=$(m.editId);
if(null!=m.edit)
{
var editAreaHtml=m.edit.innerHTML;
$remove(m.edit);
m.setEditArea(editAreaHtml);}
else
{
if(!m.page.CanEditFlake)$ND(m.editLinkId);}
m.texts=pageParts.texts;
m.setIcon(pageParts.icon);},
createNewModule:function(page,m,parent)
{
page.modules[m.id]=m;
m.page=page;
m.div=$$("DIV");
m.div.className="module";
m.divId="module"+m.id;
m.div.id=m.divId;
var moduleHtml=App.getModuleHtml(m);
m.div.innerHTML=moduleHtml;
if(parent)
{
parent.appendChild(m.div);}
else
{
var body=$(MODULE_CONTAINER);
body.appendChild(m.div);}
m.resolve();
return m;},
loadPageModules:function(page,forceRefresh,callback)
{
page.isLoaded=true;
if(page.modules==null||page.modules.length==0||forceRefresh)
{
var retryDone=false;
function callbackGetPageContent(result)
{
if(null==result&&retryDone===false)
{
retryDone=true;
retryGetPageContent();}
else
{
P.processLoadedModules(page,result);
PageProgress.hide();
if(typeof callback=="function")callback();}}
function retryGetPageContent()
{
window.setTimeout(function()
{
App.Server.GetPageContent(App.UserGUID,page.id,page.versionNo,VERSION_SUFFIX+"retry",callbackGetPageContent);},3000);}
App.Server.GetPageContent(App.UserGUID,page.id,page.versionNo,VERSION_SUFFIX,callbackGetPageContent,retryGetPageContent);}
else
{
P.afterPageModulesLoad(page,page.modules,page.modulePageParts);
PageProgress.hide();
if(typeof callback=="function")callback();}},
processLoadedModules:function(page,result)
{
page.build(result);
TabManager.refresh();
P.afterPageModulesLoad(page,page.modules,page.modulePageParts);},
afterPageModulesLoad:function(page,modules,pageParts)
{
var modulesToCreate=P.initializeLayout(page,modules);
if(pageParts==null||pageParts.length==0)
P.loadModuleContent(page,modulesToCreate);
else
P.populateModuleWithContent(page,pageParts);},
initializeLayout:function(page,result)
{
var st=new Date();
P.createPageLayout(page);
var pagesToLoad=[];
var pagesToLoadCounter=0;
for(var i=0;i<result.length;i++)
{
var moduleDef=result[i];
var col=moduleDef.col;
if(col>=page.columnCount)
{
col=0;
moduleDef.col=0;}
if(page.columns[col].modules==null)
{
page.columns[col].modules=[];}
var module=new Module();
module.Build(moduleDef);
page.columns[col].modules[moduleDef.row]=module;
var m=P.createNewModule(page,module,page.columns[col].div);
pagesToLoad[pagesToLoadCounter++]=Array(m.id,m.url);}
var et=new Date();Log.add("initializeLayout: "+result.length+" "+(et.getTime()-st.getTime()));
return pagesToLoad;},
loadModuleContent:function(page,modulesToCreate)
{
App.Server.GetPageModules(page.id,function(result)
{
P.populateModuleWithContent(page,result);});},
populateModuleWithContent:function(page,modulePageParts)
{
var st=new Date();
for(var i=0;i<modulePageParts.length;i++)
{
var pageInfo=modulePageParts[i];
var module=page.modules[pageInfo.id];
if(null==module)
{
$showMsg(Lang.MODULE_NOT_LOADED+pageInfo.url,10000);}
else
{
if(!P.loadPage(pageInfo,module.body))
{
App.addError("Cannot download module: "+module.url);}
else
{
P.afterLoad(module,pageInfo);
MLC.addSubscriber(module);}}}
var et=new Date();Log.add("populateModuleWithContent: "+modulePageParts.length+" "+(et.getTime()-st.getTime()));},
saveModule:function(pageId,m,successCallback,failureCallback)
{
App.Server.SaveModule(pageId,m,
function(pageVersionNo)
{
App.endWork(m.id);
if(typeof successCallback=="function")successCallback();
m.isDirty=false;
P.precachePage(pageId,pageVersionNo);},
function(error)
{
var timedout=error.get_timedOut();
if(timedout)
{
App.endWork(m.id);
if(typeof failureCallback=="function")failureCallback();}
else
{
PU.dumpException(result);
if(typeof failureCallback=="function")failureCallback();}});},
saveLayout:function(page)
{
MQ.add('P.saveLayout',3000,true,function()
{
P.saveLayoutNow(page);});},
dontSaveLayout:function(page)
{
MQ.remove('P.saveLayout',3000);},
saveLayoutNow:function(page)
{
if(!page.CanMoveFlakes)return;
var modulesToSave=[];
for(var col=0;col<page.columnCount;col++)
{
var colModules=page.columns[col].modules;
for(var row=0;row<colModules.length;row++)
{
var module=colModules[row];
if(null!=module&&!module.temp)
{
var clone=module.cloneShallow();
modulesToSave.add(clone);
module.isDirty=false;}}}
var pageInfo=page.clone();
App.Server.SaveLayout(pageInfo,modulesToSave,
function(versionNo)
{
P.precachePage(page.id,versionNo);},null,"SaveLayout");}};
var Pageflakes=P;
var ChannelDownloadStatus={
CURRENT_PAGE_DOWNLOAD_PENDING:0,
DOWNLOADED:1,
DOWNLOADING:2,
FAILED:3,
DOWNLOAD_INPROGRESS:4};
var RssCache=RC={
CacheBookmarkedFeeds:false,
SELECTED_CHANNEL_SAVEDFEEDS:-2,
_modifiedChannelIDs:'',
_cachedRssChannelList:[],
_cacheSubscriberList:[],
_savedRSSItemChannel:null,
cacheAllSavedRssItem:function()
{
RssServices.GetSavedRssItems(function(channel)
{
if(channel!=null)
{
channel.ID=RC.SELECTED_CHANNEL_SAVEDFEEDS;
channel.Title=Lang.MY_SAVED_ARTICLES;
RC._savedRSSItemChannel=channel;}});},
addToSavedRssItemList:function(rssItem)
{
if(RC._savedRSSItemChannel==null)
{
RssServices.GetSavedRssItems(function(channel)
{
channel.ID=FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID;
channel.Title=Lang.MY_SAVED_ARTICLES;
RC._savedRSSItemChannel=channel;
return RC.addToSavedRssItemList2(rssItem);});}
else
{
return RC.addToSavedRssItemList2(rssItem);}},
addToSavedRssItemList2:function(rssItem)
{
var isNew=true;
for(var i=0;i<RC._savedRSSItemChannel.Feeds.length;i++)
{
if(rssItem.ID==RC._savedRSSItemChannel.Feeds[i].ID)
{
isNew=false;}}
if(isNew)
{
RC._savedRSSItemChannel.Feeds[i]=rssItem;
RssServices.SaveRSSItem(rssItem.ID,rssItem.IsRead,function(){});}
return RC._savedRSSItemChannel.Feeds.length;},
removeFromSavedRssItemList:function(rssItemID)
{
var tmpArray=new Array();
var index=0;
for(var i=0;i<RC._savedRSSItemChannel.Feeds.length;i++)
{
if(rssItemID!=RC._savedRSSItemChannel.Feeds[i].ID)
{
tmpArray[index++]=RC._savedRSSItemChannel.Feeds[i];}}
RC._savedRSSItemChannel.Feeds=tmpArray;
RssServices.RemoveSavedRSSItem(rssItemID,function(){});},
updateSavedRssItemList:function(rssItemID,isRead)
{
for(var i=0;i<RC._savedRSSItemChannel.Feeds.length;i++)
{
if(rssItemID==RC._savedRSSItemChannel.Feeds[i].ID)
{
RC._savedRSSItemChannel.Feeds[i].IsRead=isRead;
RssServices.SaveRSSItem(rssItemID,isRead,function(){});
break;}}},
addToSubscriberList:function(flakeRef)
{
var alreadyInList=false;
for(var i=0;i<RC._cacheSubscriberList.length;i++)
{
if(RC._cacheSubscriberList[i]==flakeRef)
{
alreadyInList=true;
break;}}
if(!alreadyInList)
RC._cacheSubscriberList[i]=flakeRef;},
removeFromSubscriberList:function(flakeRef)
{
var index=0;
var tmpArray=new Array();
for(var i=0;i<RC._cacheSubscriberList.length;i++)
{
if(RC._cacheSubscriberList[i]!=flakeRef)
{
tmpArray[index++]=RC._cacheSubscriberList[i]}}
RC._cacheSubscriberList=tmpArray;},
getCachedRssChannel:function(channelId)
{
for(var i=0;i<RC._cachedRssChannelList.length;i++)
{
if(RC._cachedRssChannelList[i].ID==channelId)
{
return RC._cachedRssChannelList[i];}}
return null;},
getCachedRssFeed:function(channelId,rssItemId)
{
var channel=RC.getCachedRssChannel(channelId);
if(channel!=null)
{
for(var i=0;i<channel.Feeds.length;i++)
{
if(channel.Feeds[i].ID==rssItemId)
{
return channel.Feeds[i];}}}
return null;},
removeChannelFromCache:function(url)
{
var len=RC._cachedRssChannelList.length;
for(var i=0;i<len;i++)
{
if(RC._cachedRssChannelList[i]==null)
continue;
if(RC._cachedRssChannelList[i].FeedSource==url)
{
RC.removeCachedRssChannel(RC._cachedRssChannelList[i].ID);}}},
addChannelInCache:function(url)
{
RssServices.GetRSSChannel(url,true,0,
function(channel)
{
RC.updateCachedRssChannel(channel,false);});},
hasChannelSubscriber:function(channelID)
{
for(var i=0;i<RC._cacheSubscriberList.length;i++)
{
if(RC._cacheSubscriberList[i].getChannelID()==channelID)
return true;}
return false;},
refreshCachedRssChannelList:function()
{
RssServices.GetSubscribedRssChannels(function(channels)
{
if(channels!=null)
{
var channelsToRemove=new Array();
var index=0;
var len=RC._cachedRssChannelList.length;
var channelLen=channels.length;
for(var j=0;j<len;j++)
{
var foundInList=false;
for(var k=0;k<channelLen;k++)
{
if(channels[k].ID==RC._cachedRssChannelList[j].ID)
{
foundInList=true;
break;}}
if(!foundInList)
channelsToRemove[index++]=RC._cachedRssChannelList[j].ID;}
for(var x=0;x<channelsToRemove.length;x++)
{
RC.removeCachedRssChannel(channelsToRemove[x]);}
if(channels.length>0)
{
for(var i=0;i<channels.length;i++)
{
RC.updateCachedRssChannel(channels[i],false);}}}});},
cacheAllSubscribedChannelSummary:function(channels)
{
for(var i=0;i<channels.length;i++)
{
var channel=channels[i];
var cachedChannel=RC.getCachedRssChannel(channel.ID);
if(cachedChannel!=null)cachedChannel.ReadItemIds=channel.ReadItemIds;
RC.updateCachedRssChannel(channels[i],false);}
RC.refreshSubscribedFlakes();},
updateCachedRssChannelHistory:function(rssChannel)
{
for(var i=0;i<RC._cachedRssChannelList.length;i++)
{
if(RC._cachedRssChannelList[i].ID==rssChannel.ID)
{
var cachedChannel=RC._cachedRssChannelList[i];
RC.refreshFeedReadStatus(rssChannel.ReadItemIds,cachedChannel);}}},
refreshFeedReadStatus:function(readItemIds,rssChannel)
{
if(null==readItemIds||readItemIds=="")return;
readItemIds=" "+readItemIds;
for(var i=0;i<rssChannel.Feeds.length;i++)
{
var feedItem=rssChannel.Feeds[i];
feedItem.IsRead=(readItemIds.indexOf(feedItem.ID)>0);}},
updateCachedRssChannel:function(rssChannel,replaceCurrent)
{
if(rssChannel==null)
return false;
var updated=false;
var isNew=true;
var i=0;
for(;i<RC._cachedRssChannelList.length;i++)
{
if(RC._cachedRssChannelList[i].ID==rssChannel.ID)
{
isNew=false;
if(replaceCurrent)
{
RC._cachedRssChannelList[i]=rssChannel;
updated=true;
break;}
else
{
RC._cachedRssChannelList[i].DownloadStatus=rssChannel.DownloadStatus;
RC._cachedRssChannelList[i].Title=rssChannel.Title;
RC.addFeedsInList(i,rssChannel);
updated=true;
break;}}}
if(isNew)
{
updated=true;
RC._cachedRssChannelList[i]=rssChannel;}
else
{
RC.refreshFeedReadStatus(RC._cachedRssChannelList[i].ReadItemIds,RC._cachedRssChannelList[i]);}
RC.sortFeedList(RC._cachedRssChannelList[i],false);
return updated;},
sortFeedList:function(feedList,isAsc)
{
var x,y,holder;
for(x=0;x<feedList.length-1;x++)
{
for(y=0;y<feedList.length-1-x;y++)
{
if(isAsc)
{
if(feedList[y].SerialNo>feedList[y+1].SerialNo)
{
holder=feedList[y+1];
feedList[y+1]=feedList[y];
feedList[y]=holder;}}
else
{
if(feedList[y].SerialNo<feedList[y+1].SerialNo)
{
holder=feedList[y+1];
feedList[y+1]=feedList[y];
feedList[y]=holder;}}}}},
sortFeedList2:function(feedList,isAsc)
{
var x,y,holder;
for(x=0;x<feedList.length-1;x++)
{
for(y=0;y<feedList.length-1-x;y++)
{
if(isAsc)
{
if(feedList[y].PublishDate>feedList[y+1].PublishDate)
{
holder=feedList[y+1];
feedList[y+1]=feedList[y];
feedList[y]=holder;}}
else
{
if(feedList[y].PublishDate<feedList[y+1].PublishDate)
{
holder=feedList[y+1];
feedList[y+1]=feedList[y];
feedList[y]=holder;}}}}},
removeCachedRssChannel:function(rssChannelID)
{
if(RC.hasChannelSubscriber(rssChannelID))
return;
var index=0;
var tmpArray=new Array();
for(var i=0;i<RC._cachedRssChannelList.length;i++)
{
if(RC._cachedRssChannelList[i].ID!=rssChannelID)
{
tmpArray[index++]=RC._cachedRssChannelList[i];}}
RC._cachedRssChannelList=tmpArray;},
addFeedsInList:function(existingChannelIndex,channelWithNewFeed)
{
if(RC._cachedRssChannelList[existingChannelIndex].Feeds!=null)
{
var oldItemCount=RC._cachedRssChannelList[existingChannelIndex].Feeds.length;
var index=oldItemCount;
var alreadyInList=false;
for(var j=0;j<channelWithNewFeed.Feeds.length;j++)
{
alreadyInList=false;
for(var k=0;k<oldItemCount;k++)
{
if(channelWithNewFeed.Feeds[j].ID==RC._cachedRssChannelList[existingChannelIndex].Feeds[k].ID)
{
alreadyInList=true;
channelWithNewFeed.Feeds[j].IsRead=RC._cachedRssChannelList[existingChannelIndex].Feeds[k].IsRead;
channelWithNewFeed.Feeds[j].SerialNo=RC._cachedRssChannelList[existingChannelIndex].Feeds[k].SerialNo;
RC._cachedRssChannelList[existingChannelIndex].Feeds[k]=channelWithNewFeed.Feeds[j];
break;}}
if(!alreadyInList)
{
RC._cachedRssChannelList[existingChannelIndex].Feeds[index++]=channelWithNewFeed.Feeds[j];}}
RC.sortFeedList(RC._cachedRssChannelList[existingChannelIndex].Feeds,false);}},
cachingStarted:false,
startCachingFeeds:function()
{
if(!RC.cachingStarted)
{
window.setTimeout("RC.updateCache()",10);
window.setTimeout("RC.updateCache()",15);
RC.cachingStarted=true;}},
getChannelToUpdate:function()
{
for(var i=0;i<RC._cachedRssChannelList.length;i++)
{
if(RC._cachedRssChannelList[i].DownloadStatus==ChannelDownloadStatus.CURRENT_PAGE_DOWNLOAD_PENDING)
{
RC._cachedRssChannelList[i].DownloadStatus=ChannelDownloadStatus.DOWNLOADING;
return RC._cachedRssChannelList[i];}}
if(RC.CacheBookmarkedFeeds)
{
for(var i=0;i<RC._cachedRssChannelList.length;i++)
{
if(RC._cachedRssChannelList[i].DownloadStatus!=ChannelDownloadStatus.CURRENT_PAGE_DOWNLOAD_PENDING&&
RC._cachedRssChannelList[i].DownloadStatus!=ChannelDownloadStatus.DOWNLOADING&&
RC._cachedRssChannelList[i].DownloadStatus!=ChannelDownloadStatus.DOWNLOADED&&
RC._cachedRssChannelList[i].DownloadStatus!=ChannelDownloadStatus.DOWNLOAD_INPROGRESS&&
RC._cachedRssChannelList[i].DownloadStatus!=ChannelDownloadStatus.FAILED)
{
RC._cachedRssChannelList[i].DownloadStatus=ChannelDownloadStatus.DOWNLOADING;
return RC._cachedRssChannelList[i];}}}
return null;},
updateCache:function()
{
var channelToUpdate=RC.getChannelToUpdate();
if(channelToUpdate==null)
{
setTimeout(RC.updateCache,30000);
return;}
else
{
channelToUpdate.DownloadStatus=ChannelDownloadStatus.DOWNLOAD_INPROGRESS;
RssServices.GetRSSChannel(channelToUpdate.FeedSource,false,0,
function(updatedChannel)
{
if(updatedChannel!=null)
{
var date=new Date();
updatedChannel.DownloadStatus=ChannelDownloadStatus.DOWNLOADED;
RC.updateCachedRssChannel(updatedChannel,false);
try
{
RC.refreshFlake(updatedChannel.ID);
var channelDiv=$(FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX+updatedChannel.ID);
FeedViewer.setChannelHeaderText(channelDiv,updatedChannel.ID,FeedViewer.MAX_FEED_VIEWER_TITLE_LENGTH,true,false);
FeedViewer.refreshAllFeedUnreadCount();}
catch(ex)
{}
RC.updateCache();}},
function()
{
RC.updateCache();},
function()
{
RC.updateCache();});}},
updateCacheForUncachedFeedsOnly:function(startIndex)
{
for(var i=startIndex;i<RC._cachedRssChannelList.length;i++)
{
if(RC._cachedRssChannelList[i].Feeds.length==0)
{
RssServices.GetRSSChannel(RC._cachedRssChannelList[i].FeedSource,false,0,
function(updatedChannel)
{
if(updatedChannel!=null)
{
RC._cachedRssChannelList[i]=updatedChannel;
var channelDiv=$(FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX+updatedChannel.ID);
FeedViewer.setChannelHeaderText(channelDiv,updatedChannel.ID,FeedViewer.MAX_FEED_VIEWER_TITLE_LENGTH,true,false);
RC.updateCacheForUncachedFeedsOnly(i+1);}},
function()
{
RC.updateCacheForUncachedFeedsOnly(i+1);});
break;}}},
startRefreshingCachedFeed:function()
{
RC.refreshCachedFeed(0);},
refreshCachedFeed:function(index)
{
RssServices.GetRSSChannel(RC._cachedRssChannelList[index].FeedSource,true,0,
function(updatedChannel)
{
if(updatedChannel!=null)
RC._cachedRssChannelList[index]=updatedChannel;
RC.updateNextCachedFeed(index);});},
updateNextCachedFeed:function(index)
{
if(index+1<RC._cachedRssChannelList.length)
RC.refreshCachedFeed(index+1);},
changeReadStatus:function(channelId,rssItemId,isRead)
{
RC.channelModified(channelId);
var page=P.currentPage;
if(page.IsPublished==true&&page.IsOwner==false)
return;
if(channelId==FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID)
{
RC.updateSavedRssItemList(rssItemId,isRead);
FeedViewer.refreshSavedRssItemChannelTitle();}
else
{
if(channelId==FeedViewer.SELECTED_CHANNEL_ALLFEEDS_ID)
channelId=FeedViewer._tmpChannelID;
var rssChannel=RC.getCachedRssChannel(channelId);
if(rssChannel!=null)
{
if(rssChannel.Feeds!=null)
{
for(var i=0;i<rssChannel.Feeds.length;i++)
{
if(rssChannel.Feeds[i].ID==rssItemId)
rssChannel.Feeds[i].IsRead=isRead;}
RssServices.ChangeRSSItemReadStatus(channelId,rssItemId,isRead,function(){});}}
FeedViewer.refreshAllFeedUnreadCount();}},
changeChannelReadStatus:function(channelId,isRead)
{
RC.channelModified(channelId);
var page=P.currentPage;
if(page.IsPublished==true&&page.IsOwner==false)
return;
if(channelId==FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID)
{
for(var i=0;i<RC._savedRSSItemChannel.Feeds.length;i++)
{
RC.updateSavedRssItemList(RC._savedRSSItemChannel.Feeds[i].ID,isRead);
FeedViewer.refreshSavedRssItemChannelTitle();}}
else if(channelId==FeedViewer.SELECTED_CHANNEL_ALLFEEDS_ID)
{
RC.changeAllChannelReadStatus(isRead);}
else
{
var rssChannel=RC.getCachedRssChannel(channelId);
if(rssChannel!=null)
{
if(rssChannel.Feeds!=null)
{
var rssItemIDs=new Array();
var index=0;
for(var i=0;i<rssChannel.Feeds.length;i++)
{
rssItemIDs[index++]=rssChannel.Feeds[i].ID;
rssChannel.Feeds[i].IsRead=isRead;}
RssServices.ChangeRSSItemReadStatus2(channelId,rssItemIDs,isRead);}}
FeedViewer.refreshAllFeedUnreadCount();}},
changeAllChannelReadStatus:function(isRead)
{
var page=P.currentPage;
if(page.IsPublished==true&&page.IsOwner==false)
return;
var channelIDs=new Array();
var index=0;
for(var i=0;i<RC._cachedRssChannelList.length;i++)
{
var rssChannel=RC._cachedRssChannelList[i];
RC.channelModified(rssChannel.ID);
if(rssChannel.Feeds!=null)
{
for(var j=0;j<rssChannel.Feeds.length;j++)
{
rssChannel.Feeds[j].IsRead=isRead;}}
channelIDs[index++]=rssChannel.ID;}
RssServices.ChangeChannelsReadStatus(channelIDs,isRead);},
channelModified:function(channelId)
{
if(RC._modifiedChannelIDs.indexOf(channelId)<0)
RC._modifiedChannelIDs+=channelId+',';},
getUnreadCount:function(channelId)
{
var rssChannel=RC.getCachedRssChannel(channelId);
rssChannel.UnreadCount=0;
for(var i=0;i<rssChannel.Feeds.length;i++)
{
if(!rssChannel.Feeds[i].IsRead)
rssChannel.UnreadCount++;}
return rssChannel.UnreadCount;},
refreshSubscribedFlakes:function()
{
for(var i=0;i<RC._cacheSubscriberList.length;i++)
{
var channelId=RC._cacheSubscriberList[i].getChannelID();
if(RC._modifiedChannelIDs.indexOf(channelId.toString())>-1)
{
RC._cacheSubscriberList[i].showFeeds(false);}}},
refreshFlake:function(channelId)
{
for(var i=0;i<RC._cacheSubscriberList.length;i++)
{
if(channelId==RC._cacheSubscriberList[i].getChannelID())
{
RC._cacheSubscriberList[i].showFeeds(false);}}}};
function FeedReader(id)
{
var FlakeMode=
{
RegularRSS:1,
LocalEvent:2,
UniversalNewsSearch:3,
TechnoratiBlogSearch:4};
var _instance=null;
var _me=this;
var _id=id;
var _channelID=0;
var _channel=null;
var _startIndex=0;
var _toolTipHandle=null;
var _alreadyRendered=false;
var _currViewingMedia=0;
var _isInitialLoading=true;
var AUTO_REFRESH_TIME=1000*60*11;
var THIS_BROWSER_WINDOW="CurrentBrowser";
var NEW_BROWSER_WINDOW="NewBrowser";
var PAGEFLAKES_BROWSER_WINDOW="ThisBrowser";
var RSS_READER="RssReader";
var MAX_TITILE_LENGTH=45;
var MAX_TOOLTIP_TEXT_LENGTH=300;
var TOOLTIP_DIV_WIDTH=280;
var DEFAULT_ITEM_COUNT=5;
var CHAR_WIDTH=5.5;
var BOLD_CHAR_WIDTH=6.5;
var CHAR_HEIGHT=15;
var _noOfCharactersAllowedPerLine=50;
var _noOfBoldCharactersAllowedPerLine=40;
var _availableWidth=100;
var _useCity=true;
var _settingsChanged=false;
var HEADLINE_ONLY='1';
var SUMMARY='2';
var THUMBNAIL='3';
var THUMBNAIL2='4';
var GRIDVIEW_4x3='5';
var SHOW_POST_IN='ShowPostIn';
var URL='Url';
var TITLE='Title';
var ITEM_COUNT='ItemCount';
var SHOW_TOOLTIP='TooltipOption';
var SHOW_NAVIGATION='ShowNavigation';
var MEDIA_TARGET='MediaTarget';
var VIEW_MODE='ViewMode';
var SEARCH_KEY='searchKey';
var UNIVERSAL_NEWS_FAVICON=IMAGE_PREFIX+'images/UniversalNewsFlake.gif';
var UNIVERSAL_BLOG_FAVICON=IMAGE_PREFIX+'images/flakes/techno.gif';
var PF_FAVICON=IMAGE_PREFIX+'images/pficon.gif';
var SHOW_PF_FAVICON='showpffavicon%3Dtrue';
var BLANK_CITY_PARAM='&q=+';
var MEDIA_PLAYERID=_id+'player';
var MediaTarget=
{
Internal:'1',
External:'2'};
var _startEdit=null;
this.getChannelID=function()
{
return _channelID;}
this.onclose=function()
{
RC.removeFromSubscriberList(_me);
RC.removeCachedRssChannel(_channelID);}
this.refresh=function()
{
_me.switchToRegularView();
var itemCount=_instance.Profiles[ITEM_COUNT];
if(_instance.Profiles[ITEM_COUNT]==null)
itemCount=_me.DEFAULT_ITEM_COUNT;
_me.showDownloadInProgress();
var key=Math.random();
var feedUrl=_me.getFeedUrl();
RssServices.GetRSSChannel5(feedUrl,0,itemCount,key,function(result)
{
if(result!=null)
{
result.DownloadStatus=ChannelDownloadStatus.CURRENT_PAGE_DOWNLOAD_PENDING;
RC.updateCachedRssChannel(result,true);
_startIndex=0;
if(result.Feeds.length>0)
_me.showFeeds(true);
else
_me.showFeeds(false);
_me.refreshTitle();}},
function()
{},
function()
{});}
this.load=function(instance)
{
_instance=instance;
_me.loadEditArea();
_me.loadBody();
_me.loadFlakeConfig();
if(_instance.Profiles[SHOW_NAVIGATION]==null)
_instance.Profiles[SHOW_NAVIGATION]='false';
if(_instance.Profiles[MEDIA_TARGET]==null)
_instance.Profiles[MEDIA_TARGET]=MediaTarget.Internal;
if(_instance.Profiles[SHOW_TOOLTIP]==null)
_instance.Profiles[SHOW_TOOLTIP]='true';
if(_instance.Profiles[VIEW_MODE]==null&&_instance.Profiles['DescriptionOption']=='true')
{
_instance.Profiles[VIEW_MODE]=SUMMARY;
$(_id+'drpViewMode').value=SUMMARY;}
_me.loadSettings();
_me.refreshResult(false);
_me.autoRefresh();
_startEdit=_instance.startEdit;
_instance.startEdit=_me.titleEdited;
_instance.beforeClose=function()
{
EM.removePlayer(MEDIA_PLAYERID);
return true;}
_instance.dragStart=function()
{
var pd=$(_id+'divPlayer');
if(pd!=null&&pd.innerHTML!='')
{
if(OS.isWindows&&_me.getFlakeMode()==FlakeMode.RegularRSS)
EM.removePlayer(MEDIA_PLAYERID);}}
_instance.dragEnd=function()
{
_me.resizeGridView();
var pd=$(_id+'divPlayer');
if(pd!=null&&pd.innerHTML!='')
{
if(OS.isWindows&&_me.getFlakeMode()==FlakeMode.RegularRSS)
_me.showPreview(null,_currViewingMedia);}}}
this.loadFlakeConfig=function()
{
var flakeMode=_me.getFlakeMode();
if(flakeMode==FlakeMode.UniversalNewsSearch||flakeMode==FlakeMode.TechnoratiBlogSearch)
{}
else
{
_instance.enableRefresh();}}
this.loadEditArea=function()
{
var flakeMode=_me.getFlakeMode();
if(flakeMode==FlakeMode.UniversalNewsSearch||flakeMode==FlakeMode.TechnoratiBlogSearch||flakeMode==FlakeMode.LocalEvent)
{
_instance.setEditArea('<table><tr><td>Show:<\/td><td><select id="'+id+'drpViewMode" onchange="'+id+'.settingChanged()"><option value="'+HEADLINE_ONLY+'">Headline only</option>'+'<option value="'+SUMMARY+'">Summary</option><option selected="selected" value="'+THUMBNAIL+'">Thumbnail</option><option value="'+THUMBNAIL2+'">Multiple thumbnails</option></select><\/td<\/tr><tr><td width="100px">Open post in:<\/td><td><select id="'+id+'drpShowPostIn" onchange="'+id+'.settingChanged();"> <option selected="selected" value="NewBrowser">original site (new browser window)<\/option> <option value="ThisBrowser">original site (Pageflakes browser)<\/option> <option value="CurrentBrowser">original site (this browser window)<\/option> <\/select> <input id="'+id+'txtUrl" style="display: none;" type="text" onkeypress="if( event.keyCode == 13 ) document.getElementById(\''+id+'btnSave\').click()" \/><\/td><\/tr>'+'<tr><td>No of posts:<\/td><td><select id="'+id+'drpItemCount" onchange="'+id+'.settingChanged()"> <option value="1">1<\/option> <option value="2">2<\/option> <option value="3">3<\/option> <option value="4">4<\/option> <option value="5">5<\/option> <option value="6">6<\/option> <option value="7">7<\/option> <option value="8">8<\/option> <option value="9">9<\/option> <option value="10">10<\/option> <option value="11">11<\/option> <option value="12">12<\/option> <option value="13">13<\/option> <option value="14">14<\/option> <option value="15">15<\/option> <option value="16">16<\/option> <option value="17">17<\/option> <option value="18">18<\/option> <option value="19">19<\/option> <option value="20">20<\/option> <option value="25">25<\/option> <\/select><\/td><\/tr><tr><td>Show tooltip:<\/td><td><input id="'+id+'chkShowTooltip" type="checkbox" checked="CHECKED" onclick="'+id+'.settingChanged()" \/><\/td><tr><td>Older postings:<\/td><td><input id="'+id+'chkShowNavigation" checked="CHECKED" type="checkbox" onclick="'+id+'.settingChanged()"\/><\/td><\/tr><\/tr><tr><td><\/td><td>'+'<input type="button" id="'+id+'btnSave" class="button" value="Save" onclick="'+id+'.save();" \/>'+'&nbsp;<input type="button" id="'+id+'btnSave" class="button cancel" value="Cancel" onclick="'+id+'.cancelSave();" \/><\/td><\/tr><\/table><\/div>');
if(flakeMode==FlakeMode.UniversalNewsSearch)
{
_instance.setTitle('Universal News Search');}
else
{
_instance.setTitle('Universal Blog Search');}}
else
{
_instance.setEditArea('<table><tr><td>Show:<\/td><td><select id="'+id+'drpViewMode" onchange="'+id+'.settingChanged()">'+'<option value="'+HEADLINE_ONLY+'">Headline only</option>'+'<option value="'+SUMMARY+'">Summary</option>'+'<option value="'+THUMBNAIL+'">Thumbnail</option>'+'<option value="'+THUMBNAIL2+'">Multiple thumbnails</option>'+'<option value="'+GRIDVIEW_4x3+'">4x3 Grid view</option>'+'</select><\/td<\/tr><tr><td width="100px">Open post in:<\/td><td>'+'<select id="'+id+'drpShowPostIn" onchange="'+id+'.settingChanged();">'+'<option value="RssReader">RSS Reader<\/option>'+'<option selected="selected" value="NewBrowser">original site (new browser window)<\/option>'+'<option value="ThisBrowser">original site (Pageflakes browser)<\/option>'+'<option value="CurrentBrowser">original site (this browser window)<\/option>'+'<\/select>'+'<input id="'+id+'txtUrl" style="display: none;" type="text" onkeypress="if( event.keyCode == 13 ) document.getElementById(\''+id+'btnSave\').click()" \/>'+'<\/td><\/tr>'+'<tr><td>Play audio/video in:<\/td><td><select id="'+id+'drpMediaTarget" onchange="'+id+'.settingChanged()">'+'<option value="'+MediaTarget.Internal+'">inside the Flake<\/option>'+'<option value="'+MediaTarget.External+'">external player<\/option>'+'<\/select><\/td><\/tr><\/tr>'+'<tr><td>Title:<\/td><td><input style="display:none;" id="'+id+'txtTitle" type="text" onkeyup="'+id+'.titleChanged();" \/>'+'<input id="'+id+'btnResetTitle" class="button" type="button" value="Reset" onclick="'+id+'.setOriginalTitle();" \/><\/td><\/tr>'+'<tr><td>No of posts:<\/td><td><select id="'+id+'drpItemCount" onchange="'+id+'.settingChanged()"> <option value="1">1<\/option> <option value="2">2<\/option>'+'<option value="3">3<\/option> <option value="4">4<\/option> <option value="5">5<\/option> <option value="6">6<\/option> <option value="7">7<\/option>'+'<option value="8">8<\/option> <option value="9">9<\/option> <option value="10">10<\/option> <option value="11">11<\/option> <option value="12">12<\/option>'+'<option value="13">13<\/option> <option value="14">14<\/option> <option value="15">15<\/option> <option value="16">16<\/option> <option value="17">17<\/option>'+'<option value="18">18<\/option> <option value="19">19<\/option> <option value="20">20<\/option> <option value="25">25<\/option> <\/select><\/td><\/tr>'+'<tr><td>Show tooltip:<\/td><td><input id="'+id+'chkShowTooltip" type="checkbox" checked="CHECKED" onclick="'+id+'.settingChanged()" \/><\/td>'+'<tr><td>Older postings:<\/td><td><input id="'+id+'chkShowNavigation" type="checkbox" onclick="'+id+'.settingChanged()"\/><\/td><\/tr><\/tr>'+'<tr><td><\/td><td><input class="button" type="button" id="'+id+'btnSave" value="Save" onclick="'+id+'.save();" \/>&nbsp;<input type="button" id="'+id+'btnSave" class="button cancel" value="Cancel" onclick="'+id+'.cancelSave();" \/><\/td><\/tr><\/table><\/div>');}}
this.loadBody=function()
{
var flakeMode=_me.getFlakeMode();
if(flakeMode==FlakeMode.UniversalNewsSearch||flakeMode==FlakeMode.TechnoratiBlogSearch)
{
var searchKey='pageflakes';
if(_instance.Profiles[SEARCH_KEY]!=null)
{
searchKey=_instance.Profiles[SEARCH_KEY];}
else
{
_instance.Profiles[SEARCH_KEY]=searchKey;}
_instance.body.innerHTML='<div class="rssSearchKeyDiv"><input class="rssSearchKey" type="text" value="'+searchKey+'" id="'+id+'searchKey" onkeypress="if( event.keyCode == 13 ) '+id+'.universalNews_Search();" onfocus="this.select();"/> <input type="button" value="Search" onclick="'+id+'.universalNews_Search()" /></div><div id="'+id+'divResult" style="width: 100%;"><span style="padding:8px;">Downloading...</span></div><div id="'+id+'divNavigation"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td><div id="'+id+'lnkPrev" onclick="'+id+'.prev();" style="display: none; cursor:pointer;cursor:hand; color=navy;">later articles</div></td><td style="width: 100px"></td><td align="right"><div id="'+id+'lnkNext" onclick="'+id+'.next();" style="display: none; cursor:pointer;cursor:hand;text-align:right; color=navy;">older articles</div></td></tr></table></div>';}
else
{
var gridViewHTML='<div id="'+id+'divPreview" class="rssMediaPreviewWindow" >'+'<table cellpadding="0" cellspacing="0" width="100%"><tr><td align="center"><div id="'+id+'divPlayer"></div></td></tr><tr><td align="center">'+'<input  style="margin-top:10px" type="button" value="< Back" class="button" onclick="'+id+'.switchToRegularView();" /></td></tr></table>'+'</div>';
_instance.body.innerHTML='<div id="'+id+'divResult" style="width:100%;"><span style="padding:8px;">Downloading...</span></div>'+gridViewHTML+'<div id="'+id+'divNavigation"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td><div id="'+id+'lnkPrev" onclick="'+id+'.prev();" style="display: none; cursor:pointer;cursor:hand; color=navy;">later articles</div></td><td style="width: 100px"></td><td align="right"><div id="'+id+'lnkNext" onclick="'+id+'.next();" style="display: none; cursor:pointer;cursor:hand;text-align:right;color=navy;">older articles</div></td></tr></table></div>';}
_instance.body.style.padding="0px";}
this.loadFavicon=function(channel)
{
if(channel!=null)
{
var flakeMode=_me.getFlakeMode();
var feedIcon=$("icon"+_id);
if(flakeMode==FlakeMode.UniversalNewsSearch||flakeMode==FlakeMode.TechnoratiBlogSearch)
{
_instance.setIcon(UNIVERSAL_NEWS_FAVICON);}
else if(_me.getFlakeMode()==FlakeMode.LocalEvent)
{
_instance.setIcon(PF_FAVICON);}
else
{
_instance.setIcon(channel.Favicon);}}}
this.onTitleChange=function()
{
_me.refreshTitle();}
this.autoRefresh=function()
{
MQ.add(_id+'autoRefresh',AUTO_REFRESH_TIME,true,function()
{
try
{
if(_startIndex==0)
{
var channel=RC.getCachedRssChannel(_channelID);
channel.DownloadStatus=ChannelDownloadStatus.CURRENT_PAGE_DOWNLOAD_PENDING;
RC.updateCachedRssChannel(channel,false);
_me.showFeeds(false);}
_me.autoRefresh();}
catch(ex)
{
PU.dumpException(ex);}});}
this.loadSettings=function()
{
if(_instance.Profiles[SHOW_POST_IN]!=null)
$(_id+'drpShowPostIn').value=_instance.Profiles[SHOW_POST_IN];
_me.refreshTitle();
if(_instance.Profiles[ITEM_COUNT]==null)
_instance.Profiles[ITEM_COUNT]=DEFAULT_ITEM_COUNT;
$(_id+'drpItemCount').value=_instance.Profiles[ITEM_COUNT];
if(App.IsCompactFramework)
_instance.Profiles[SHOW_TOOLTIP]='false';
if(_instance.Profiles[SHOW_TOOLTIP]=='true')
$(_id+'chkShowTooltip').checked=true;
else
$(_id+'chkShowTooltip').checked=false;
var drpMT=$(_id+'drpMediaTarget');
if(drpMT!=null)
{
if(_instance.Profiles[MEDIA_TARGET]==null)
drpMT.value=MediaTarget.Internal;
else
drpMT.value=_instance.Profiles[MEDIA_TARGET];}
var flakeMode=_me.getFlakeMode();
if(_instance.Profiles[SHOW_NAVIGATION]=='true')
$(_id+'chkShowNavigation').checked=true;
else if(flakeMode==FlakeMode.UniversalNewsSearch||flakeMode==FlakeMode.TechnoratiBlogSearch)
{
$(_id+'chkShowNavigation').checked=true;
_instance.Profiles[SHOW_NAVIGATION]='true';}
else
$(_id+'chkShowNavigation').checked=false;
if(_instance.Profiles[VIEW_MODE]!=null)
$(_id+'drpViewMode').value=_instance.Profiles[VIEW_MODE];
else
{
if(_me.getFeedUrl().indexOf('flickr')>0)
{
_instance.Profiles[ITEM_COUNT]='12';
$(_id+'drpItemCount').value='12';
$(_id+'drpItemCount').disabled=true;
_instance.Profiles[VIEW_MODE]=GRIDVIEW_4x3;
$(_id+'drpViewMode').value=GRIDVIEW_4x3;}
else
{
_instance.Profiles[VIEW_MODE]=THUMBNAIL;
$(_id+'drpViewMode').value=THUMBNAIL;}}
if(_instance.Profiles[VIEW_MODE]==GRIDVIEW_4x3)
RssFlakeResizer.subscribe(_me);
if($(_id+'drpItemCount').value=='12')
$(_id+'drpItemCount').disabled=true;
else
$(_id+'drpItemCount').disabled=false;}
this.settingChanged=function()
{
if($(_id+'drpViewMode').value==GRIDVIEW_4x3)
{
$(_id+'drpItemCount').value=12;
$(_id+'drpItemCount').disabled=true;
RssFlakeResizer.subscribe(_me);}
else
{
$(_id+'drpItemCount').disabled=false;
RssFlakeResizer.unSubscribe(_me);}
_settingsChanged=true;}
this.changeSettings=function()
{
if($(_id+'drpViewMode').value==GRIDVIEW_4x3)
{
_instance.Profiles[ITEM_COUNT]=12;
$(_id+'drpItemCount').value=12;
$(_id+'drpItemCount').disabled=true;
RssFlakeResizer.subscribe(_me);}
else
{
$(_id+'drpItemCount').disabled=false;
RssFlakeResizer.unSubscribe(_me);}
if(_instance.Profiles[ITEM_COUNT]!=$(_id+'drpItemCount').value)
{
_startIndex=0;}
_instance.Profiles[SHOW_POST_IN]=$(_id+'drpShowPostIn').value;
_instance.Profiles[ITEM_COUNT]=$(_id+'drpItemCount').value;
if($(_id+'chkShowTooltip').checked)
_instance.Profiles[SHOW_TOOLTIP]='true';
else
_instance.Profiles[SHOW_TOOLTIP]='false';
if($(_id+'chkShowNavigation').checked)
_instance.Profiles[SHOW_NAVIGATION]='true';
else
_instance.Profiles[SHOW_NAVIGATION]='false';
if($(_id+'drpMediaTarget')!=null)
_instance.Profiles[MEDIA_TARGET]=$(_id+'drpMediaTarget').value;
_instance.Profiles[VIEW_MODE]=$(_id+'drpViewMode').value;
_me.showFeeds(false);}
this.refreshTitle=function()
{
var rssChannel=RC.getCachedRssChannel(_channelID);
var titleText=_instance.title;
if(titleText.substring(titleText.length-1,titleText.length)==")")
titleText=titleText.substring(0,titleText.lastIndexOf("("));
if($trim(titleText).length==0)
titleText=_me.getOriginalTitle();
if(titleText.length>MAX_TITILE_LENGTH)
if(titleText.substring(titleText.length-3)!='...')
titleText=titleText.substring(0,MAX_TITILE_LENGTH)+"...";
_instance.setTitle(titleText);
var flakeMode=_me.getFlakeMode();
if(flakeMode!=FlakeMode.UniversalNewsSearch&&flakeMode!=FlakeMode.TechnoratiBlogSearch)
{
if(rssChannel!=null)
{
rssChannel.UnreadCount=0;
if(rssChannel.Feeds!=null)
{
for(var i=0;i<rssChannel.Feeds.length;i++)
{
if(!rssChannel.Feeds[i].IsRead)
rssChannel.UnreadCount++;}
_instance.setNumber(rssChannel.UnreadCount);}}}}
this.getOriginalTitle=function()
{
var channel=RC.getCachedRssChannel(_channelID);
if(channel!=null)
return channel.Title;
else
return"";}
this.setOriginalTitle=function()
{
_instance.title=_me.getOriginalTitle();
_me.refreshTitle();}
this.cancelSave=function()
{
_instance.toggleEdit();
_me.loadSettings();}
this.save=function()
{
if(_settingsChanged)
_me.changeSettings();
_instance.save();
var channel=RC.getCachedRssChannel(_channelID);
if(channel!=null)
{
if(parseInt(_instance.Profiles[ITEM_COUNT])>channel.Feeds.length)
{
_me.downloadFeeds(channel.FeedSource,false,1);}}
_instance.toggleEdit();
_me.resizeGridView();}
this.getFlakeMode=function()
{
var url=_me.getRawUrl();
if(url.indexOf('locationaware=true')>0)
{
return FlakeMode.LocalEvent;}
else if(url.indexOf('flakemode=universalnewssearch')>0)
{
return FlakeMode.UniversalNewsSearch;}
else if(url.indexOf('flakemode=technoratiblogsearch')>0)
{
return FlakeMode.TechnoratiBlogSearch;}
else
{
return FlakeMode.RegularRSS;}}
this.titleEdited=function()
{
_instance.Profiles['TitleEdited']=1;
_startEdit.apply(_instance);}
this.isTitleEdited=function()
{
return(_instance.Profiles['TitleEdited']=='1');}
this.getRawUrl=function()
{
return unescape(_instance.url.substring(_instance.url.indexOf('?')+5));}
var COUNTRY_NAME_US=' US us United States united states USA usa';
this.getFeedUrl=function()
{
var url=_me.getRawUrl();
if(_me.getFlakeMode()==FlakeMode.LocalEvent)
{
var fourthParam=App.My.Country;
if(COUNTRY_NAME_US.indexOf(App.My.Country)>0)
{
if(App.My.State.length>0)
{
fourthParam=App.My.State;}}
if(_useCity)
{
url=String.format(url,App.My.City,App.My.State,App.My.Country,(App.My.State.length==0?App.My.Country:App.My.State),fourthParam);}
else
{
url=String.format(url,'',App.My.State,App.My.Country,(App.My.State.length==0?App.My.Country:App.My.State),fourthParam);}}
else if(_me.getFlakeMode()==FlakeMode.UniversalNewsSearch)
{
var language='en';
var location='us';
if(App.My.Country!=null)
if(App.My.Country.length>0)
location=App.My.Country;
if(startupInfo.Language!=null)
language=startupInfo.Language;
var searchKey=_instance.Profiles[SEARCH_KEY];
if(searchKey.length>0)
url=String.format(url,language,location,searchKey);
else
url='';}
else if(_me.getFlakeMode()==FlakeMode.TechnoratiBlogSearch)
{
var searchKey=_instance.Profiles[SEARCH_KEY];
if(searchKey.length>0)
{
url=url.replace('&flakemode=technoratiblogsearch','');
url=String.format(url,searchKey);}
else
{
url='';}}
return url;}
this.setFeedUrl=function(url)
{
var prefix=_instance.url.substring(0,_instance.url.indexOf('?'));
_instance.url=prefix+"?url="+url;}
this.refreshResult=function(forceUpdate)
{
$(_id+'divNavigation').display="none";
var feedUrl=_me.getFeedUrl();
if(feedUrl.length>0)
this.downloadFeeds(feedUrl,forceUpdate,2,0);}
this.showDownloadInProgress=function()
{
var resultDiv=$(_id+'divResult');
var height=resultDiv.offsetHeight;
if(height<30)
height=30;
var navBar=$(id+'divNavigation');
if(navBar.style.display!='none')
{
height+=navBar.offsetHeight;
$ND(navBar);}
resultDiv.innerHTML="<div class='downloadInProgress' style='height:"+height+"px' >&nbsp;</div>";
$('refresh'+id).className='refreshInProgress_icon';}
this.isFeedTooOld=function(feedItem)
{
var maxDiffAllowed=86400000;
var currentDate=new Date();
currentDate.getHours();
var diff=currentDate-feedItem.PublishDate;
if(diff>maxDiffAllowed)
return true;
else
return false;}
this.sortFeedForThumbnailView=function(feeds,start,end,setMode)
{
for(var i=start;i<end;i++)
{
var item=feeds[i];
var imageUrl=item.PreviewImage;
if(imageUrl.length>0)
{
$(_id+'drpViewMode').value=THUMBNAIL;
if(setMode)
_instance.Profiles[VIEW_MODE]=$(_id+'drpViewMode').value;
if(i!=start&&!_me.isFeedTooOld(item))
{
var selectedItem=feeds[i];
for(var j=i-1;j>=start;j--)
{
feeds[j].SerialNo=feeds[j+1].SerialNo;
feeds[j+1]=feeds[j];}
selectedItem.SerialNo=feeds[start].SerialNo;
feeds[start]=selectedItem;}
break;}
else if(item.Description.length>0||item.EncodedContent.length>0)
{}
else
{
if(_instance.Profiles[VIEW_MODE]==null)
{}}}}
this.updateEditAreaOptions=function(channel)
{
var canShowGridView=false;
if(channel!=null)
{
if(channel.Feeds.length>0)
{
for(var i=0;i<channel.Feeds.length;i++)
{
if(channel.Feeds[i].PreviewImage.length>0)
{
canShowGridView=true;
break;}}}}
if(!canShowGridView)
{
var drpViewMode=$(id+'drpViewMode');
var allOptions=drpViewMode.getElementsByTagName('option');
for(var i=0;i<allOptions.length;i++)
{
if(allOptions[i].getAttribute('value')==GRIDVIEW_4x3)
drpViewMode.removeChild(allOptions[i]);}}}
this.downloadFeeds=function(feedUrl,forceUpdate,retryCount,startIndex)
{
if(startIndex==null)
startIndex=0;
var resultDiv=$(_id+'divResult');
_me.showDownloadInProgress();
var itemCount=null;
var flakeMode=_me.getFlakeMode();
if(flakeMode!=FlakeMode.UniversalNewsSearch&&flakeMode!=FlakeMode.TechnoratiBlogSearch)
{
itemCount=_instance.Profiles[ITEM_COUNT];
if(_instance.Profiles[ITEM_COUNT]==null)
itemCount=_me.DEFAULT_ITEM_COUNT;}
else
{
itemCount=50;}
RssServices.GetRSSChannel3(feedUrl,forceUpdate,startIndex,itemCount,function(result)
{
if(result!=null)
{
_channelID=result.ID;
_channel=result;
if(_isInitialLoading)
{
_isInitialLoading=false;
_me.loadFavicon(result);}
_me.updateEditAreaOptions(result);
result.DownloadStatus=ChannelDownloadStatus.CURRENT_PAGE_DOWNLOAD_PENDING;
if(result.Feeds.length>0)
{
var flakeMode=_me.getFlakeMode();
if(flakeMode==FlakeMode.UniversalNewsSearch||flakeMode==FlakeMode.TechnoratiBlogSearch)
{
_channel=result;}
else
{
RC.updateCachedRssChannel(result,false);
RC.addToSubscriberList(_me);}
if(result.Feeds.length<itemCount)
_me.showFeeds(false);
else
_me.showFeeds(true);}
else
{
var feedUrl=_me.getFeedUrl();
if(_me.getFlakeMode()==FlakeMode.LocalEvent)
{
if(!(feedUrl.indexOf(BLANK_CITY_PARAM)>0))
{
_useCity=false;
feedUrl=_me.getFeedUrl();
if(retryCount>0)
_me.downloadFeeds(feedUrl,true,--retryCount,0);}
else
{
RC.updateCachedRssChannel(result,false);
RC.addToSubscriberList(_me);
_me.showFeeds(false);}}
else
{
RC.updateCachedRssChannel(result,false);
RC.addToSubscriberList(_me);
_me.showFeeds(false);}}
_me.refreshTitle();}},
function(msg)
{
if(retryCount==0)
$(_id+'divResult').innerHTML=msg+" Please <"+"a href=\"#\" onclick=\""+_id+".refreshResult(true)\">click here<"+"/"+"a> to try again.";
else
{
_me.downloadFeeds(feedUrl,forceUpdate,--retryCount,startIndex);}});}
this.showFeeds=function(autoDownload)
{
var channel=null;
var flakeMode=_me.getFlakeMode();
if((flakeMode==FlakeMode.UniversalNewsSearch||flakeMode==FlakeMode.TechnoratiBlogSearch)&&_instance.Profiles[SEARCH_KEY]=='')
{
$(id+'divResult').innerHTML="<div style='padding:5px'>Please enter search key.</div>";
$nodisplay(id+'divNavigation');
return;}
if((flakeMode==FlakeMode.UniversalNewsSearch||flakeMode==FlakeMode.TechnoratiBlogSearch)&&_channel!=null)
{
channel=_channel;}
else
{
channel=RC.getCachedRssChannel(_channelID);}
var feedUrl=_me.getFeedUrl();
if(_me.getFlakeMode()==FlakeMode.LocalEvent)
{
if(!_me.isTitleEdited())
{
if(App.My.City!='')
{
var country=App.My.Country;
if(COUNTRY_NAME_US.indexOf(App.My.Country)>0)
{
country=App.My.State;}
if(feedUrl.indexOf(BLANK_CITY_PARAM)>0)
{
var title=country+" News";
_instance.setTitle(title);}
else
{
var title=App.My.City+", "+country+" News";
_instance.setTitle(title);}}}}
var result=$(_id+'divResult');
if(result==null)
return;
if(result.offsetWidth>0)
{
_noOfCharactersAllowedPerLine=Math.round(result.offsetWidth/CHAR_WIDTH);
_noOfBoldCharactersAllowedPerLine=Math.round(result.offsetWidth/BOLD_CHAR_WIDTH);
_availableWidth=result.offsetWidth-30;}
var showNextLink=true;
$('refresh'+id).className='refresh_icon';
if(channel==null)
{
result.innerHTML="There was a connection problem. Please <"+"a href=\"#\" onclick=\""+_id+".refreshResult(true)\">click here<"+"/"+"a> to try again.";
return;}
RC.sortFeedList(channel.Feeds,false);
var feeds=channel.Feeds.slice();
if(feeds.length==0)
{
result.innerHTML="<div style='padding:5px;'>No items found.</div>";
return;}
if(_startIndex>=feeds.length)
{
var flakeMode=_me.getFlakeMode();
if(autoDownload&&flakeMode!=FlakeMode.UniversalNewsSearch&&flakeMode!=FlakeMode.TechnoratiBlogSearch)
{
_me.downloadFeeds(channel.FeedSource,false,1,_startIndex);
return;}}
else if(_instance.Profiles[VIEW_MODE]==GRIDVIEW_4x3)
{
if((feeds.length-_startIndex)<12)
{
if(autoDownload)
{
_me.downloadFeeds(channel.FeedSource,false,1,_startIndex);
return;}}}
var lastIndex=_startIndex+parseInt(_instance.Profiles[ITEM_COUNT]);
if(lastIndex>feeds.length)
lastIndex=feeds.length;
if(_startIndex>=lastIndex&&_startIndex>0)
{
_startIndex-=parseInt(_instance.Profiles[ITEM_COUNT]);
showNextLink=false;}
if(_instance.Profiles[VIEW_MODE]==null||_instance.Profiles[VIEW_MODE]==THUMBNAIL)
{
_me.sortFeedForThumbnailView(feeds,_startIndex,lastIndex,false);}
var resultHTML='';
if(_instance.Profiles[VIEW_MODE]==GRIDVIEW_4x3)
{
resultHTML=_me.getGridViewHTML(feeds,_startIndex,lastIndex);}
else
{
resultHTML=_me.getListViewHTML(feeds,_startIndex,lastIndex);}
var count=lastIndex-_startIndex;
var prev=$(_id+'lnkPrev');
if(_startIndex>0)
prev.style.display="block";
else
prev.style.display="none";
var next=$(_id+'lnkNext');
if(_instance.Profiles[ITEM_COUNT]==count&&showNextLink)
next.style.display="block";
else
next.style.display="none";
if(prev.style.display=="none"&&next.style.display=="none")
{
$(_id+'divNavigation').style.display="none";}
else
{
if(_instance.Profiles[SHOW_NAVIGATION]=='true')
{
$(_id+'divNavigation').style.display="block";
$(_id+'divNavigation').style.padding="5px";}
else
{
next.style.display="none";
prev.style.display="none";
$(_id+'divNavigation').style.display="none";}}
_me.refreshTitle();
result.innerHTML=resultHTML;
_me.resizeGridView();}
this.getListViewHTML=function(feeds,_startIndex,lastIndex)
{
var content=new Sys.StringBuilder("");
content.append('<div class="rssOutputWindow"><table border="0" cellpadding="0" cellspacing="0" width="100%">');
var isLastItem=false;
for(var i=_startIndex;i<lastIndex;i++)
{
if(lastIndex-1==i)
isLastItem=true;
if(feeds[i].Description.length>0)
{
var singleRowHtml=_me.getSingleRowHTML(feeds[i],_noOfCharactersAllowedPerLine,i,isLastItem);
content.append(singleRowHtml);}
else
{
var singleRowHtml=_me.renderHeadlineView(feeds[i],_noOfCharactersAllowedPerLine);
content.append(singleRowHtml);}}
content.append('</table></div>');
return content.toString();}
this.getGridViewHTML=function(feeds,_startIndex,lastIndex)
{
var content=new Sys.StringBuilder("");
content.append('<table width="100%"><tr><td>');
var linkScript='';
var item=null;
var totalWidthAvailable=$(_id+'divResult').offsetWidth;
var widthAvailableForImage=totalWidthAvailable-16
var singleImageWidth=(widthAvailableForImage/4);
for(var i=_startIndex;i<lastIndex;i++)
{
item=feeds[i];
linkScript=_me.getLinkScript(item,'lnk'+item.ID);
var imgSrc=feeds[i].PreviewImage;
if(imgSrc.length>0)
{
var html=_me.getPreviewImageHTML(item,imgSrc,singleImageWidth,singleImageWidth,null,'gridItem','gridItem');
content.append(html);
_me.loadThumbnail(feeds[i].PreviewImage,"img"+feeds[i].ID);}}
content.append('</td></tr></table>');
return content.toString();}
this.resizeGridView=function()
{
if(_instance.Profiles[VIEW_MODE]==GRIDVIEW_4x3)
{
var resultDiv=$(_id+'divResult');
var totalWidthAvailable=resultDiv.offsetWidth;
var widthAvailableForImage=totalWidthAvailable-16;
var newImgW=widthAvailableForImage/4;
var images=resultDiv.getElementsByTagName('img');
for(var i=0;i<images.length;i++)
{
if(images[i].getAttribute("type")=='playButton')
{
images[i].style.top=(newImgW-16)+"px";
images[i].style.left=(newImgW-19)+"px";}
else
{
images[i].setAttribute("height",newImgW);
images[i].setAttribute("width",newImgW);}}
var divs=resultDiv.getElementsByTagName('div');
for(var i=0;i<divs.length;i++)
{
if(newImgW>0&&divs[i].className!='downloadInProgress')
divs[i].style.width=(newImgW+1)+"px";}}}
this.getSingleRowHTML=function(item,maxCharactersAllowedPerLine,index,isLastItem)
{
var viewMode=_instance.Profiles[VIEW_MODE];
switch(viewMode)
{
case HEADLINE_ONLY:
return _me.renderHeadlineView(item,maxCharactersAllowedPerLine);
break;
case SUMMARY:
return _me.renderSummaryView(item,maxCharactersAllowedPerLine,isLastItem);
break;
case THUMBNAIL:
if(index==_startIndex)
if(item.PreviewImage.length>0)
return _me.renderThumbnailView(item,maxCharactersAllowedPerLine,isLastItem);
else
return _me.renderSummaryView(item,maxCharactersAllowedPerLine,isLastItem);
else
return _me.renderHeadlineView(item,maxCharactersAllowedPerLine);
break;
case null:
case undefined:
if(index==_startIndex)
if(item.PreviewImage.length>0)
return _me.renderThumbnailView(item,maxCharactersAllowedPerLine,isLastItem);
else
return _me.renderSummaryView(item,maxCharactersAllowedPerLine,isLastItem);
else
return _me.renderHeadlineView(item,maxCharactersAllowedPerLine);
break;
case THUMBNAIL2:
if(item.PreviewImage.length>0)
return _me.renderThumbnailView(item,maxCharactersAllowedPerLine,isLastItem);
else
return _me.renderSummaryView(item,maxCharactersAllowedPerLine,isLastItem);
break;}}
this.renderHeadlineView=function(item,maxCharactersAllowedPerLine)
{
var content=_me.getFormattedTitle(item,maxCharactersAllowedPerLine);
var html;
var linkScript=_me.getLinkScript(item,'lnk'+item.ID);
var mediaPreviewLink=_me.getPreviewButtonHtml(item.ID);
if(item.IsRead)
html='<tr><td class="headlineView_rssitem_body"><div class="headlineView_bullet">&nbsp;</div>'+'<div class="headlineView_titleDiv"><a id="lnk'+item.ID+'" viewMode="'+HEADLINE_ONLY+'" '+
linkScript+' class="headlineView_title_read">'+content+'</a>'+mediaPreviewLink+'</div></td></tr>';
else
html='<tr><td class="headlineView_rssitem_body"><div class="headlineView_bullet">&nbsp;</div><div class="headlineView_titleDiv"><a id="lnk'+
item.ID+'" viewMode="'+HEADLINE_ONLY+'" '+linkScript+' class="headlineView_title_unread">'+content+'</a>'+mediaPreviewLink+'</div></td></tr>';
return html;}
this.renderSummaryView=function(item,maxCharactersAllowedPerLine,isLastItem)
{
var headerContent=_me.getFormattedTitle(item,_noOfBoldCharactersAllowedPerLine);
var descriptionContent=_me.getFormattedDescription(item,maxCharactersAllowedPerLine*2);
var html;
var headerlinkScript=_me.getLinkScript(item,'lnk'+item.ID);
var bodylinkScript=_me.getLinkScript(item,'lnkDes'+item.ID);
var tdClassName='summaryView_rssitem_body';
var mediaButton=_me.getPreviewButtonHtml(item.ID);
if(isLastItem)
tdClassName='summaryView_rssitem_body_lastItem';
if(item.IsRead)
html='<tr><td class="'+tdClassName+'"><a id="lnk'+item.ID+'" viewMode="'+SUMMARY+'" '+headerlinkScript+' class="summaryView_title_read">'+headerContent+'</a>'+'<a id="lnkDes'+item.ID+'" '+bodylinkScript+' class="summaryView_desc">'+descriptionContent+'</a>'+mediaButton+'</td></tr>';
else
html='<tr><td class="'+tdClassName+'"><a id="lnk'+item.ID+'" viewMode="'+SUMMARY+'" '+headerlinkScript+' class="summaryView_title_unread">'+headerContent+'</a>'+'<a id="lnkDes'+item.ID+'" '+bodylinkScript+' class="summaryView_desc">'+descriptionContent+'</a>'+mediaButton+'</td></tr>';
return html;}
this.renderThumbnailView=function(item,maxCharactersAllowedPerLine,isLastItem)
{
var imageUrl=item.PreviewImage;
var tmpImage=$$('img');
tmpImage.id=_id+item.ID;
tmpImage.setAttribute("rssItemId",item.ID);
tmpImage.style.left='-2000px';
tmpImage.style.top='0px';
tmpImage.style.position='absolute';
document.body.appendChild(tmpImage);
tmpImage.onload=function()
{
var rssItemId=this.getAttribute("rssItemId");
_me.renderThumbnailView2(this.src,this.width,this.height,rssItemId);
document.body.removeChild(this);}
if(Browser.isIE)
setTimeout('$("'+_id+item.ID+'").src = "'+imageUrl+'";',50);
else
tmpImage.src=imageUrl;
tmpImage.onerror=function()
{
var rssItemId=this.getAttribute("rssItemId");
if(Browser.isIE)
{
MQ.add('CreateRssUI'+rssItemId,100,true,_me.renderThumbnailView2(this.src,Math.round(_availableWidth/3),70,rssItemId));}
else
{
_me.renderThumbnailView2(this.src,this.width,this.height,rssItemId);}}
var tdClassName='thumbnailView_rssitem_body';
if(isLastItem)
tdClassName='thumbnailView_rssitem_body_lastItem';
var existingRow=$('td'+_id+item.ID);
var tmpHeight='100';
if(existingRow!=null)
if(existingRow.offsetHeight>0)
tmpHeight=existingRow.offsetHeight;
var headerContent=_me.getFormattedTitle(item,_noOfBoldCharactersAllowedPerLine);
var descriptionContent=_me.getFormattedDescription(item,maxCharactersAllowedPerLine*2);
var mediaButton=_me.getPreviewButtonHtml(item.ID);
var linkClassName='thumbnailView_title_unread';
if(item.IsRead)
linkClassName='thumbnailView_title_read';
var headerlinkScript=_me.getLinkScript(item,'lnk'+item.ID);
var bodylinkScript=_me.getLinkScript(item,'lnkDes'+item.ID);
var bodyImglinkScript=_me.getLinkScript(item,'lnkDesImg'+item.ID);
var tempTDContent='<div><a class="'+linkClassName+'" '+headerlinkScript+' id="lnk'+item.ID+'" viewMode="'+THUMBNAIL+'">'
+headerContent+'</a><a id="lnkDesImg'+item.ID+'" '+bodyImglinkScript+'><div style="width:'+(_availableWidth/3)+'px;" class="thumbnailDummyImage">&nbsp;</div></a>'
+'<div class="thumbnailView_desc"><a id="lnkDes'+item.ID+'" class="thumbnailView_desc"'+bodylinkScript+' >'+descriptionContent+'</a>'+mediaButton+'</div></div>';
var html='<tr><td class="'+tdClassName+'" id="td'+_id+item.ID+'">'+tempTDContent+'</td></tr>';
return html;}
this.getItemFromChannel=function(rssItemId)
{
for(var i=0;i<_channel.Feeds.length;i++)
{
if(_channel.Feeds[i].ID==rssItemId)
{
return _channel.Feeds[i];}}
return null;}
this.renderThumbnailView2=function(imageSrc,imageWidth,imageHeight,rssItemId)
{
var item=null;
var td=$('td'+_id+rssItemId);
if(td==null)
return;
var flakeMode=_me.getFlakeMode();
if(flakeMode==FlakeMode.UniversalNewsSearch||flakeMode==FlakeMode.TechnoratiBlogSearch)
{
item=_me.getItemFromChannel(rssItemId);}
else
{
item=RC.getCachedRssFeed(_channelID,rssItemId);}
var headerContent=_me.getFormattedTitle(item,_noOfBoldCharactersAllowedPerLine);
var linkClassName='thumbnailView_title_unread';
if(item.IsRead)
linkClassName='thumbnailView_title_read';
var headerlinkScript=_me.getLinkScript(item,'lnk'+item.ID);
var bodylinkScript=_me.getLinkScript(item,'lnkDes'+item.ID);
if(item.PreviewImage.length==0||imageWidth==0)
{
var availableWidthForDesc=_availableWidth-imageWidth;
var maxCharactersAllowedPerLine=Math.round(availableWidthForDesc/CHAR_WIDTH);
var descriptionContent=_me.getFormattedDescription(item,maxCharactersAllowedPerLine*2);
var mediaButton=_me.getPreviewButtonHtml(item.ID);
td.innerHTML='<div><a class="'+linkClassName+'" '+headerlinkScript+' id="lnk'+rssItemId+'" viewMode="'+THUMBNAIL+'">'
+headerContent+'</a>'+'<div class="thumbnailView_desc"><a id="lnkDes'+rssItemId+'" class="thumbnailView_desc"'+bodylinkScript+' >'+descriptionContent+'</a>'
+mediaButton+'</div></div>';}
else
{
if(imageWidth>(_availableWidth/3))
{
var ratio=imageHeight/imageWidth;
imageWidth=_availableWidth/3;
imageHeight=ratio*imageWidth;
imageWidth=Math.round(imageWidth);
imageHeight=Math.round(imageHeight);}
var availableWidthForDesc=_availableWidth-imageWidth;
var maxCharactersAllowedPerLine=Math.round(availableWidthForDesc/CHAR_WIDTH);
var bodyImglinkScript=_me.getLinkScript(item,'lnkDesImg'+item.ID);
var noOflines=Math.round(imageHeight/CHAR_HEIGHT);
var descriptionContent=_me.getFormattedDescription(item,maxCharactersAllowedPerLine*noOflines);
var prevImgHTML=_me.getPreviewImageHTML(item,imageSrc,imageHeight,imageWidth,'thumbnailView_image',null,'thumbnailView_image');
td.innerHTML='<a class="'+linkClassName+'" '+headerlinkScript+' id="lnk'+rssItemId+'" viewMode="'+THUMBNAIL+'">'
+headerContent+'</a><div>'+prevImgHTML
+'<div class="thumbnailView_desc"><a id="lnkDes'+rssItemId+'" class="thumbnailView_desc"'+bodylinkScript+' >'+descriptionContent+'</a>'
+'</div></div>';}}
this.getPreviewImageHTML=function(item,imgSrc,imgH,imgW,divClass,lnkClass,imgClass)
{
var imgClassDiff='';
if(imgClass!=null)
imgClassDiff=' class="'+imgClass+'" ';
var lnkClassDiff='';
if(lnkClass!=null)
lnkClassDiff=' class="'+lnkClass+'" ';
var divClassDiff='';
if(divClass!=null)
divClassDiff=' class="'+divClass+'" ';
var imgId='img'+item.ID;
var link='';
var mediaFound=false;
if(item.MediaGroup!=null)
{
var preferredMedia=EmbeddedMedia.getBestMediaFormatForClient(item.MediaGroup);
if(preferredMedia!=null&&preferredMedia.URL.length>0)
{
mediaFound=true;
if(_instance.Profiles[MEDIA_TARGET]==MediaTarget.External)
{
link=' target="_blank" href="'+preferredMedia.URL+'" ';}
else if(_instance.Profiles[MEDIA_TARGET]==MediaTarget.Internal)
{
link='onclick="'+_id+'.showPreview(event,'+item.ID+')" ';}}}
if(mediaFound)
{
var playButtonTop=imgH-14;
var playButtonLeft=imgW-19;
var lnkId='lnkDesImg'+item.ID;
var tooltipScript=' onmouseover="'+_id+'.title_onmouseover(event,'+item.ID+', \''+lnkId+'\');" onmouseout="'+_id+'.title_onmouseout();" ';
var html='<a id="'+lnkId+'" '+lnkClassDiff+link+tooltipScript+'>'
+'<div '+divClassDiff+' class="prevImgDiv" style="width:'+imgW+'"><img '+imgClassDiff+' id="'+imgId+'" width="'+imgW+'" height="'+imgH+'" src="'+imgSrc+'" />'+'<img type="playButton" id="imgPlayMedia'+item.ID+'" style="z-index:10; position: absolute; left:'+playButtonLeft+'px; top:'+playButtonTop+'px;" src="App_Themes/common/mediaPreviewButton.gif" '+'alt="'+Lang.CLICK_TO_PLAY+'" title="'+Lang.CLICK_TO_PLAY+'" class="rssMediaPreviewButton" /></div></a>';
return html;}
else
{
link=_me.getLinkScript(item,'lnkDesImg'+item.ID);
var html='<a id="lnkDesImg'+item.ID+'" '+link+'><img '+imgClassDiff+' width="'+imgW+'" height="'+imgH+'" src="'+imgSrc+'" /></a>';
return html;}}
this.getPreviewButtonHtml=function(rssItemId)
{
var html='<div style="display:inline;" id="divDummy'+rssItemId+'" ></div>';
setTimeout(function()
{
var dummyImg=$('divDummy'+rssItemId);
if(dummyImg!=null)
dummyImg.innerHTML=_me.getPreviewButtonHtml2(rssItemId);},100);
return html;}
this.getPreviewButtonHtml2=function(rssItemId)
{
var item=null;
var flakeMode=_me.getFlakeMode();
if(flakeMode==FlakeMode.UniversalNewsSearch||flakeMode==FlakeMode.TechnoratiBlogSearch)
item=_me.getItemFromChannel(rssItemId);
else
item=RC.getCachedRssFeed(_channelID,rssItemId);
var buttonHTML='';
if(item.MediaGroup!=null)
{
var preferredMedia=EmbeddedMedia.getBestMediaFormatForClient(item.MediaGroup);
if(preferredMedia!=null)
{
var mediaTarget=_instance.Profiles[MEDIA_TARGET];
if(preferredMedia.URL!=null&&preferredMedia.URL.length>0)
{
if(mediaTarget==MediaTarget.External)
{
buttonHTML='<a href="{0}" target="_blank"><img style="z-index:100" src="App_Themes/common/mediaPreviewButton.gif" alt="'+Lang.CLICK_TO_PLAY+'" title="'+Lang.CLICK_TO_PLAY+'" class="rssMediaPreviewButton"/></a>';
buttonHTML=String.format(buttonHTML,preferredMedia.URL);}
else if(mediaTarget==MediaTarget.Internal)
{
buttonHTML='<img style="z-index:100" src="App_Themes/common/mediaPreviewButton.gif" alt="'+Lang.CLICK_TO_PLAY+'" title="'+Lang.CLICK_TO_PLAY+'" class="rssMediaPreviewButton" onclick="'+_id+'{0}"/>';
buttonHTML=String.format(buttonHTML,'.showPreview(event,'+rssItemId+')');}}}}
return buttonHTML;}
this.switchToPreview=function()
{
$ND(_id+'divResult');
$D(_id+'divPreview');
$ND(_id+'divNavigation');}
this.switchToRegularView=function()
{
EM.removePlayer(MEDIA_PLAYERID);
var pd=$(_id+'divPlayer');
if(pd!=null)
pd.innerHTML='';
$D(_id+'divResult');
$D(_id+'divNavigation');
$ND(_id+'divPreview');
var divRes=$(_id+'divResult');
if(divRes.offsetHeight<20)
_me.showFeeds(false);}
this.showPreview=function(e,itemId)
{
_currViewingMedia=itemId;
var rssItem=RC.getCachedRssFeed(_channelID,itemId);
_me.switchToPreview();
var preferredMedia=EmbeddedMedia.getBestMediaFormatForClient(rssItem.MediaGroup);
var width=$(_id+'divPreview').offsetWidth-10;
if(width>350)
width=350;
var height=Math.abs(Math.round(width/10*8));
var playerHtml=EmbeddedMedia.getPlayerHtml2(MEDIA_PLAYERID,rssItem.MediaGroup,preferredMedia.URL,height,width);
$(_id+'divPlayer').innerHTML=playerHtml;}
this.showPhotoPreview=function(item)
{
_me.switchToPreview();
$(_id+'divPreview').innerHTML="<img src='"+item.PreviewImage+"' />";}
this.getLinkScript=function(item,lnkId)
{
var tooltipScript=' onmouseover="'+_id+'.title_onmouseover(event,'+item.ID+', \''+lnkId+'\');" onmouseout="'+_id+'.title_onmouseout();" ';
var linkScript='';
if(_instance.Profiles[SHOW_POST_IN]==null||_instance.Profiles[SHOW_POST_IN]==NEW_BROWSER_WINDOW)
{
linkScript='target="_blank" href="'+item.Link+'"  onclick="'+_id+'.title_onclick('+item.ID+');" ';}
else if(_instance.Profiles[SHOW_POST_IN]==THIS_BROWSER_WINDOW)
{
linkScript='href="'+item.Link+'" onclick="'+_id+'.title_onclick('+item.ID+');" ';}
else
{
linkScript='href="javascript:void(0);" onclick="'+_id+'.title_onclick('+item.ID+');" ';}
return linkScript+tooltipScript;}
this.title_onmouseout=function()
{
TM.hideTooltip();}
this.title_onclick=function(rssItemId)
{
var rssItem=RC.getCachedRssFeed(_channelID,rssItemId);
if(App.IsCompactFramework)
{
top.location=rssItem.Link;}
else
{
TM.hideTooltip();
var lnkRssItem=$('lnk'+rssItemId);
if(lnkRssItem!=null)
{
var viewMode=lnkRssItem.getAttribute('viewMode');
switch(viewMode)
{
case HEADLINE_ONLY:
lnkRssItem.className='headlineView_title_read';
break;
case SUMMARY:
lnkRssItem.className='summaryView_title_read';
break;
case THUMBNAIL:
lnkRssItem.className='summaryView_title_read';
break;}}
var flakeMode=_me.getFlakeMode();
if(flakeMode!=FlakeMode.UniversalNewsSearch&&flakeMode!=FlakeMode.TechnoratiBlogSearch)
_me.markAsRead(rssItemId);
_me.refreshTitle();
if(_instance.Profiles[SHOW_POST_IN]==PAGEFLAKES_BROWSER_WINDOW)
{
var title=_me.stripHTML(rssItem.Title);
App.showHtmlViewer(title,rssItem.Link);}
else if(_instance.Profiles[SHOW_POST_IN]==THIS_BROWSER_WINDOW)
{}
else if(_instance.Profiles[SHOW_POST_IN]==null||_instance.Profiles[SHOW_POST_IN]==NEW_BROWSER_WINDOW)
{}
else if(_instance.Profiles[SHOW_POST_IN]==RSS_READER)
FeedViewer.loadChannel(_channelID,rssItemId);}}
this.title_onmouseover=function(event,rssItemId,lnkId)
{
event=$fix(event);
if(_instance.Profiles[SHOW_TOOLTIP]=='true')
{
var defaultMsg=Lang.NO_DESCRIPTION_PROVIDED;
var flakeMode=_me.getFlakeMode();
var rssItem=null;
if((flakeMode==FlakeMode.UniversalNewsSearch||flakeMode==FlakeMode.TechnoratiBlogSearch)&&_channel!=null)
{
rssItem=_me.getFeed(_channel,rssItemId);}
else
{
rssItem=RC.getCachedRssFeed(_channelID,rssItemId);}
var lnkRssItem=$(lnkId);
if(rssItem!=null)
{
var content='';
if(rssItem.Description.trim().length>0)
content=rssItem.Description;
else
content=rssItem.EncodedContent;
content=_me.stripHTML(content);
lnkRssItem.onmouseover=null;
if(TM!=null)
{
if($trim(content).length==0)
{
TM.setTooltip(lnkRssItem,defaultMsg);
TM.showTooltipNow(event,lnkRssItem,defaultMsg);}
else if(content.length>MAX_TOOLTIP_TEXT_LENGTH)
{
var msg=content.substring(0,MAX_TOOLTIP_TEXT_LENGTH)+"...";
TM.setTooltip(lnkRssItem,msg);
TM.showTooltipNow(event,lnkRssItem,msg);}
else
{
TM.setTooltip(lnkRssItem,content);
TM.showTooltipNow(event,lnkRssItem,content);}}}}}
this.getFeed=function(channel,rssItemId)
{
for(var x=0;x<channel.Feeds.length;x++)
{
if(channel.Feeds[x].ID==rssItemId)
return channel.Feeds[x];}
return null;}
this.markAsRead=function(rssItemId)
{
RC.changeReadStatus(_channelID,rssItemId,true);}
this.getFeedLinkByRSSItemId=function(id)
{
var feeds=RC.getCachedRssChannel(_channelID).Feeds;
for(var i=0;i<feeds.length;i++)
{
if(feeds[i].ID==id)
return feeds[i].Link;}
return"";}
this.prev=function()
{
_startIndex=_startIndex-parseInt(_instance.Profiles[ITEM_COUNT]);
_me.showFeeds(false);}
this.next=function()
{
_startIndex=_startIndex+parseInt(_instance.Profiles[ITEM_COUNT]);
_me.showFeeds(true);}
this.getFormattedTitle=function(item,maxTotalCharacterCount)
{
var headerText='';
if(item.Title.length>0)
{
headerText=_me.stripHTML(item.Title);}
else if(item.Description.length>0)
{
headerText=_me.stripHTML(item.Description);}
else if(item.EncodedContent.length>0)
{
headerText=stripHTML(item.EncodedContent);}
if(headerText.length<10)
return headerText;
else
return _me.getFullSentences(headerText,maxTotalCharacterCount);}
this.getFormattedDescription=function(item,maxTotalCharacterCount)
{
var descText='';
if(item.Description.length>0)
{
descText=_me.stripHTML(item.Description);}
else if(item.EncodedContent.length>0)
{
descText=_me.stripHTML(item.EncodedContent);}
var formattedText=_me.getFullSentences(descText,maxTotalCharacterCount);
if(item.MediaGroup==null)
{
formattedText+='<img src="App_Themes/common/rss_desc_link.gif" class="rss_desc_link"/>';}
return formattedText;}
this.stripHTML=function(oldString)
{
return oldString.replace(/<[^>]*>/g,"");}
var SENTENCE_END_MARKERS=['?','.'];
this.getSentences=function(text,maxTotalCharacterCount)
{
var sentences=text.split(SENTENCE_END_MARKERS[0]);
var selectedSentences=new Array();
var sentenceLength=0;
for(var i=0;i<sentences.length;i++)
{
if(sentenceLength<maxTotalCharacterCount)
{
selectedSentences[i]=sentences[i];
if(i+1<sentences.length)
selectedSentences[i]+=SENTENCE_END_MARKERS[0];}
sentenceLength+=sentences[i].length;}
for(var i=1;i<SENTENCE_END_MARKERS.length;i++)
{
var newSentenceParts=new Array();
var index=0;
for(var j=0;j<selectedSentences.length;j++)
{
var tokens=selectedSentences[j].split(SENTENCE_END_MARKERS[i]);
for(var k=0;k<tokens.length;k++)
{
newSentenceParts[index++]=tokens[k];}}
seelctedSentences=newSentenceParts;}
return selectedSentences;}
this.getFullSentences=function(content,maxNoOfCharacters)
{
var MIN_SENTENCE_LENGTH=4;
var formatedText='';
var sentences=_me.getSentences(content,maxNoOfCharacters);
if(sentences.length>0)
{
if(sentences[0].length>maxNoOfCharacters)
{
formatedText=sentences[0].substring(0,maxNoOfCharacters-3)+'...';}
else
{
var sentenceCount=sentences.length;
for(var i=0;i<sentenceCount;i++)
{
if(sentences[i].length<=maxNoOfCharacters-formatedText.length)
{
if(sentences[i].length>MIN_SENTENCE_LENGTH)
{
formatedText+=sentences[i];}
else
{
if(i+1<sentenceCount)
{
if(sentences[i].length+sentences[i+1].length<maxNoOfCharacters-formatedText.length)
{
formatedText+=sentences[i];}
else
{
if(i==0)
{
formatedText+=sentences[i];
formatedText+=sentences[i+1].substring(0,maxNoOfCharacters-formatedText.length-3)+'...';}
else
{
break;}}}}}
else
{
break;}}}
return formatedText;}
else
{
return content;}}
this.loadThumbnail=function(imgUrl,imgElementId)
{
var imageUrl=imgUrl;
var tmpImage=$$('img');
tmpImage.id=_id+imgElementId;
tmpImage.setAttribute("imgId",imgElementId);
tmpImage.style.left='-4000px';
tmpImage.style.top='0px';
tmpImage.style.position='absolute';
document.body.appendChild(tmpImage);
tmpImage.onload=function()
{
try{
var imgId=this.getAttribute("imgId");
var img=document.getElementById(imgId);
img.setAttribute("src",this.src);}catch(ex){}
document.body.removeChild(this);}
if(Browser.isIE)
{
setTimeout('$("'+_id+imgElementId+'").src = "'+imageUrl+'";',50);}
else
{
tmpImage.src=imageUrl;}
tmpImage.onerror=function()
{
document.body.removeChild(this);}}
this.universalNews_Search=function()
{
var txtKey=$(id+'searchKey');
_instance.Profiles[SEARCH_KEY]=txtKey.value;
_instance.save();
if(txtKey.value.length>0)
{
_startIndex=0;
_me.refreshResult(false);}
else
{
$(id+'divResult').innerHTML="<div style='padding:5px'>Please enter search key.</div>";
$nodisplay(id+'divNavigation');}}}
var DayNames=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var MonthNames=['January','February','March','April','May','June','July','August','September','October','November','December'];
if(document.location.href.indexOf("localhost")<0)
window.onerror=function(msg,url,linenumber)
{
var url=document.location.href;
if(url.indexOf("wwww.P.com")>0||url.indexOf("devtest.P.com")>0||url.indexOf("localhost")>0)alert(linenumber+":"+msg);}
var $PageFlakesHelper={
newNode:function(nodeName){
return $$(nodeName);},
select:function(collection,predicate){
var rc=[];
for(var i=0;i<collection.length;i++){
if(predicate(collection[i])){
rc.push(collection[i]);}}
return rc;},
find:function(collection,predicate){
for(var i=0;i<collection.length;i++){
var found=predicate(collection[i]);
if(found){
return collection[i];}}
return null;},
foreach:function(collection,closure){
for(var i=0;i<collection.length;i++){
closure(collection[i],(i==collection.length-1));}},
bind:function(funcRef,thisArg){
return function(){
return funcRef.apply(thisArg,arguments);};},
bindAsEventListener:function(funcRef,thisArg){
return function(event){
return funcRef.call(thisArg,event||window.event);};},
trim:function(value){
return value.replace(/^\s*|\s*$/g,"");},
stripTags:function(value){
return value.replace(/<\/?[^>]+>/gi,"");},
newLocation:function(label,p){
return{'label':label,'p':p,'toggle':'none'};},
mapArrayToString:function(arr){
var s="[";
for(var i=0;i<arr.length;i++){
var map=arr[i];
s+="{"
for(var key in map){
s+="'"+key+"': '"+map[key]+"',";}
s=s.substring(0,s.length-1);
s+="},";}
s=s.substring(0,s.length-1);
s+="]";
return s;},
stringToMapArray:function(str){
eval("var arr = "+str);
return arr;},
getXmlDoc:function(xmlString){
return new XMLDOM(xmlString);},
getFirstNode:function(xmlDoc,pattern){
return this.getNodes(xmlDoc,pattern)[0];},
getNodes:function(xmlDoc,pattern){
var p=pattern.split(":");
if(p.length==1){
return xmlDoc.getElementsByTagName(p[0]);}else{
var node=xmlDoc.getElementsByTagName(p.shift())[0];
while(p.length!=1){
node=node.getElementsByTagName(p.shift())[0];}
return node.getElementsByTagName(p.shift());}},
addRefreshLink:function(id,funcName){},
isFlashInstalled:function(){
var flashInstalled;
if(navigator.plugins){
flashInstalled=navigator.plugins['Shockwave Flash']!=null;}
if(!flashInstalled&&ie){
for(var i=8;i>=3;i--){
try{
new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+i);
return true;}catch(e){}}}
return flashInstalled;},
setClassName:function(el,className){
el.className=className;},
encodeURIComponent:(window.encodeURIComponent?window.encodeURIComponent:escape)}
App.startup=function(compactMode)
{
window.document.designMode="Off";
App.Server=CoreServices;
App.ContentProxy=ContentProxy;
if(compactMode)
App.initApp(window.startupInfo);
else
App.showPageflakes(window.startupInfo,window.currentPageContent);}
disposeElements=function(tagName)
{
var elements=document.getElementsByTagName(tagName);
for(var i=0;i<elements.length;i++)
$clearEvent(elements[i]);}
removeElements=function(tagName)
{
var elements=document.getElementsByTagName(tagName);
for(var i=0;i<elements.length;i++)
$remove(elements[i]);}
DisposePageflakes=function()
{
try
{
var time=new Date().getTime();
$clearEvent(document.body);
if($head)$clearEvent($head);
$head=null;
disposeElements("DIV");
disposeElements("A");
removeElements("IFRAME");
if(null!=App.pages)
{
for(var i=0;i<App.pages.length;i++)
App.pages[i].dispose();
delete App.pages;
delete App;}
if(typeof TabManager!="undefined")TabManager.dispose();
if(typeof TM!="undefined")TM.hideTooltip();
if(typeof FlakeMenu!="undefined")FlakeMenu.dispose();
if(typeof Start!="undefined")if(typeof Start.Theme!="undefined")Start.Theme.dispose();
Sys.Application.dispose();}
catch(e)
{
alert(e);}}
function loadFirstPage(loadCompleteCallback)
{
startupInfo=window.startupInfo;
if(startupInfo==null)return;
if(startupInfo.ErrorMsg!="")
{
window.suppressLoad=true;
$showMsg(startupInfo.ErrorMsg);
return;}
if(LANGUAGE!=startupInfo.Language)
LANGUAGE=startupInfo.Language;
if(VERSION_SUFFIX!=startupInfo.VersionSuffix)
{
document.location.reload(true);}
else if(startupInfo.IsMySite&&startupInfo.CurrentPageID==0)
{
document.location.href="Logout.aspx?LoadProblem=true&ReturnUrl="+escape(document.location.href);}
else if(!startupInfo.IsMySite&&startupInfo.CurrentPageID==0)
{
if(startupInfo.IsAnonymous)
{
document.location.href="Login.aspx?ReturnUrl="+escape(document.location.href);}
else
{
$showMsg(Lang.NO_PAGE_TO_ViEW);
window.suppressLoad=true;
$hide('headerRight');}}
else
{
var currentPageId=startupInfo.CurrentPageID;
if(currentPageId>0)
{
var retryDone=false;
function callbackGetPageContent(currentPageContent)
{
if(null==currentPageContent&&retryDone===false)
{
retryDone=true;
retryGetPageContent();}
else
{
window.startupInfo=startupInfo;
window.currentPageContent=currentPageContent;
l.endPageContent=new Date();
App.startup();
if(typeof loadCompleteCallback!="undefined")loadCompleteCallback();}}
function retryGetPageContent()
{
window.setTimeout(function()
{
CoreServices.GetPageContent(startupInfo.UserGUID,startupInfo.CurrentPageID,startupInfo.CurrentPageVersionNo,VERSION_SUFFIX+"retry",callbackGetPageContent);},3000);}
CoreServices.GetPageContent(startupInfo.UserGUID,startupInfo.CurrentPageID,startupInfo.CurrentPageVersionNo,VERSION_SUFFIX,callbackGetPageContent,retryGetPageContent);}}}
var PrimaryFramework={};
$DC(function()
{
if(!window.suppressLoad)
{
if(null==window.startupInfo)
{
alert(Lang.SOMETHING_WRONG);
document.location.href="Logout.aspx?LoadProblem=true&ReturnUrl="+escape(document.location.href);}
else
{
if(!window.startupInfo.IsFirstVisit)loadFirstPage();}}});
var ScriptLoader=function ScriptLoader(){
var _this=this;
this.urls=[];
this.callback=null;
this.onScriptLoad=null};
function ScriptLoader_add(url)
{
this.urls.add(url);}
function ScriptLoader_setCallback(onScriptLoad,callback)
{
this.onScriptLoad=onScriptLoad;
this.callback=callback;}
function ScriptLoader_start()
{
if(this.urls.length>0)
{
var url=this.urls.pop();
this.load(url,this.loadComplete);}}
function ScriptLoader_loadComplete()
{
if(this.urls.length>0)this.start();
else this.callback();}
function ScriptLoader_load_safari(url,callback)
{
App.ContentProxy.GetUrl1(url,10080,function(result)
{
callback(result,url);});}
function ScriptLoader_load(url,callback)
{
var _wRequest=new Sys.Net.WebRequest();
_wRequest.set_url(url);
_wRequest.set_httpVerb("GET");
_wRequest.add_completed(function(result)
{
if(result.get_responseAvailable())callback(result.get_responseData(),url);
else callback("",url);});
var executor=new Sys.Net.XMLHttpExecutor();
_wRequest.set_executor(executor);
executor.executeRequest();}
ScriptLoader.prototype={add:ScriptLoader_add,setCallback:ScriptLoader_setCallback,start:ScriptLoader_start,loadComplete:ScriptLoader_loadComplete,load:ScriptLoader_load,load_safari:ScriptLoader_load_safari};
var FlakeMenuTimer;
var FlakeMenu={
flakeId:null,
icon:null,
me:null,
justOpened:false,
dispose:function()
{
FlakeMenu.me=null;
FlakeMenu.icon=null;},
init:function()
{
FlakeMenu.me=$('sendFlakeOptionsMenu');
FlakeMenu.flakeId=FlakeMenu.me.flakeId;
FlakeMenu.icon=$('sendFlake'+FlakeMenu.flakeId);
FlakeMenu.show();},
show:function()
{
var menu=$('sendFlakeOptionsMenu');
var icon=$('sendFlake'+FlakeMenu.flakeId);
var pos=PU.getPosition(icon);
menu.flakeId=this.id;
var left=(pos[0]-10);
var wMargin=130;
var b=menu.getElementsByTagName('b')[0];
if(left+wMargin>window.Width)
{
var newLeft=window.Width-wMargin;
var diff=left-newLeft;
b.style.marginLeft=(10+diff)+"px";
left=newLeft;}
else
{
b.style.marginLeft="10px";}
menu.style.left=left+"px";
menu.style.top=(pos[1]+15)+"px";
$D(menu);
hoverClassName="sendFlake_icon sendFlake_icon_hover";
icon.className=hoverClassName;
icon.parentNode.className="flake_toolbar flake_toolbar_hover";
if(Browser.isIE)$stopBubble();
FlakeMenu.justOpened=true;
document._onclick=document.onclick;
document.onclick=function()
{
if(FlakeMenu.justOpened==false||Browser.isIE){
FlakeMenu.hide();
document.onclick=document._onclick;
document._onclick=null;}
FlakeMenu.justOpened=false;}},
hide:function()
{
$ND(FlakeMenu.me);
var icon=$('sendFlake'+FlakeMenu.flakeId);
if(icon)
icon.className='sendFlake_icon';
FlakeMenu.icon.parentNode.className="flake_toolbar";},
emailFriend:function()
{
FlakeMenu.hide();
SendFlakeToFriend.init(FlakeMenu.flakeId);},
putInBlog:function()
{
$module(FlakeMenu.flakeId).publish();
FlakeMenu.hide();},
opqTb:function()
{
opqTb(FlakeMenu.icon.parentNode.parentNode);}}
var hoverClassName;
function hover(item)
{
hoverClassName=item.className;
item.className=hoverClassName+" "+hoverClassName+"_hover";}
function hout(item)
{
item.className=hoverClassName;}
function opqTb(item)
{
var tb=item.getElementsByTagName('div')[0];
tb.className="flake_toolbar flake_toolbar_hover";}
function alphaTb(item)
{
if(!$isVisible('sendFlakeOptionsMenu')){
var tb=item.getElementsByTagName('div')[0];
tb.className="flake_toolbar";}}
window.onunload=function(){DisposePageflakes();}
