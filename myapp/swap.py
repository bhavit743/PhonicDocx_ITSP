math_dict = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
    'zero' : '0',
    'delta': 'Δ',
    'alpha': 'α',
    'beta': 'β',
    'gamma': 'γ',
    'delta':'δ',
    'epsilon': 'ε',
    'zeta': 'ζ',
    'eta':'η',
    'theta': 'θ',
    'iota': 'ι',
    'kappa':'κ',
    'lamda': 'λ',
    'mu':'μ',
    'nu':'ν',
    'xi':'ξ',
    'pi':'π',
    'rho':'ρ',
    'sigma':'σ',
    'integration of': '∫',
    'integrate': '∫',
    'integration': '∫',
    'square': '\u00b2',
    'cube': '\u00b3',
    'space':'\u0020',
    'exclamation mark':'\u0021',
    'quotation mark':'\u0022',
    'hashtag':'\u0023',
    'octothorpe':'\u0023',
    'dollar sign':'\u0024',
    'percent':'\u0025',
    'percentage':'\u0025',
    'ampersand':'\u0026',
    'and sign':'\u0026',
    'apostrophe':'\u0027',
    'right parenthesis':'\u0029',
    'left parenthesis':'\u0028',
    'asterisk':'\u002a',
    'plus sign':'\u002b',
    'plus':'\u002b',
    'comma':'\u002c',
    'coma':'\u002c',
    'hyphen':'\u002d',
    'minus':'\u002d',
    'full stop':'\u002e',
    'slash':'\u002f',
    'solidus':'\u002f',
    'solidas':'\u002f',
    'colon':'\u003a',
    'colan':'\u003a',
    'semicolon':'\u003b',
    'semicolan':'\u003b',
    'less than':'\u003c',
    'less than sign':'\u003c',
    'equal to':'\u003d',
    'equal sign':'\u003d',
    'equals':'\u003d',
    'greater than':'\u003e',
    'greater than sign':'\u003e',
    'question mark':'\u003f',
    'at sign':'\u0040',
    'at the rate':'\u0400',
    'left sqaure bracket':'\u005b',
    'right sqaure bracket':'\u005d',
    'backslash':'\u005c',
    'circumflex accent':'\u005e',
    'to the power':'\u005e',
    'underscore':'\u005f',
    'grave accent':'\u0060',
    'left curly bracket':'\u007b',
    'vertical bar':'\u007c',
    'right curly bracket':'\u007d',
    'tilde':'\u007e',
    'tilda':'\u007e',
    'plus minus':'\u00b1',
    'inverted exclamation':'\u00a1',
    'plus minus sign':'\u00b1',
    'inverted exclamation mark':'\u00a1',
    'cent':'\u00a2',
    'pound':'\u00a3',
    'currency sign':'\u00a4',
    'yen':'\u00a5',
    'broken bar':'\u00a6',
    'section sign':'\u00a7',
    'diaeresis':'\u00a8',
    'umlaut':'\u00a8',
    'copyright sign':'\u00a9',
    'ordinal indicator':'\u00aa',
    'left pointing double angle quotation mark':'\u00ab',
    'not sign':'\u00ac',
    'soft hyphen':'\u00ad',
    'registered sign':'\u00ae',
    'macron':'\u00af',
    'degree':'\u00b0',
    'degree sign':'\u00b0',
    'superscript two':'\u00b2',
    'superscript three':'\u00b3',
    'micro':'\u00b5',
    'pilcrow':'\u00b6',
    'middle dot':'\u00b7',
    'cedilla':'\u00b8',
    'superscript one':'\u00b9',
    'right pointing double angle quotation mark	':'\u00bb',
    'one quarter':'\u00bc',
    'one half':'\u00bd',
    'three quarters':'\u00be',
    'inverted question mark':'\u00bf',
    'multiplication sign':'\u00d7',
    'multiply by':'\u00d7',
    'division sign':'\u00f7',
    'divide sign':'\u00f7',
    'gha':'\u01a2',
    'capital gha':'\u01a2',
    'small gha':'\u01a3',
    'z with stroke':'\u01b5',
    'capital z with stroke':'\u01b5',
    'small z with stroke':'\u01b6',
    'double prime':'\u02ba',
    'prime sign':'02b9',
    'double prime sign':'\u02ba',
    
}

# import speech_recognition as sr
import re
from collections.abc import Iterable
def listToString(s): 
    
    # initialize an empty string
    str1 = " " 
    
    # return string  
    return (str1.join(s))

def flatten(lis):
     for item in lis:
         if isinstance(item, Iterable) and not isinstance(item, str):
             for x in flatten(item):
                 yield x
         else:        
             yield item

def Convert(string):
    li = list(string.split(" "))
    return li

def swap(val):
    words = val.split()
    wordsnew = [x.lower() for x in words]
    res2  = []
    res = []
    res3 = []
    wordsintegrate = ['integarte', 'integration', 'integrating']

    for wrd in wordsnew:
            if wrd in wordsintegrate:
                indexing = wordsnew.index(wrd)
                if wordsnew[indexing +1] == 'from':
                    indexfrom = indexing +1
                    indexto = wordsnew.index('to')
                    indexof = wordsnew.index('of')
                    wordsnew[indexing] = wordsnew[indexfrom + 1: indexto]

                    wordsnew[indexfrom] = '∫'
                    del wordsnew[indexfrom +1 : indexto]
                    indexto = wordsnew.index('to')
                    indexof = wordsnew.index('of')
                    wordsnew[indexto] = wordsnew[indexto +1: indexof]
                    del wordsnew[indexto+1: indexof+1]
                    
                    wordsnew = [''.join(sub_list) for sub_list in wordsnew]
                    
                    indexintegrate = wordsnew.index('∫')
                    indexlowerlimit = indexintegrate -1
                    indexupperlimit = indexintegrate +1
                    lowerlimit = wordsnew[indexlowerlimit]
                    upperlimit = wordsnew[indexupperlimit]
                    subscript = str.maketrans("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-=()", "ₐ₈CDₑբGₕᵢⱼₖₗₘₙₒₚQᵣₛₜᵤᵥwₓᵧZₐ♭꜀ᑯₑբ₉ₕᵢⱼₖₗₘₙₒₚ૧ᵣₛₜᵤᵥwₓᵧ₂₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎")
                    superscript = str.maketrans("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-=()", "ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾQᴿˢᵀᵁⱽᵂˣʸᶻᵃᵇᶜᵈᵉᶠᵍʰᶦʲᵏˡᵐⁿᵒᵖ۹ʳˢᵗᵘᵛʷˣʸᶻ⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾")

                    wordsnew[indexupperlimit] = upperlimit.translate(superscript)
                    wordsnew[indexlowerlimit] = lowerlimit.translate(subscript)
                                            
                else:
                    break

                                    
    # part 1 replacing 3 word signs
    wordsnew4 = list(i + " " + j + " " + k + " " + l for i, j, k, l in zip(wordsnew, wordsnew[1:], wordsnew[2:], wordsnew[3:]))
    new = []
    for wrd in wordsnew4:
        if wrd in dict.keys(math_dict):
    # searchingfrom math_dict
                new.append(math_dict.get(wrd, wrd))
        
    new = ' '.join(new)

    new2 = Convert(new)

                                    



    indexfor_replacement = 0
    for k in wordsnew4:
            if k in math_dict:
                index = wordsnew4.index(k)
                number = index
                indexnext = index +1
            
            
                wordsnew[number] = new2[indexfor_replacement]
                wordsnew[number + 1] = ''
                wordsnew[number + 2] = ''
                wordsnew[number + 3] = ''

    
                indexfor_replacement = indexfor_replacement + 1


                                    
    # part 1.2 replacing 3 word signs
    wordsnew3 = list(i + " " + j + " " + k for i, j, k in zip(wordsnew, wordsnew[1:], wordsnew[2:]))
    new = []

            


    for wrd in wordsnew3:
            if wrd in dict.keys(math_dict):
    # searchingfrom math_dict
                new.append(math_dict.get(wrd, wrd))
        
    new = ' '.join(new)

    new2 = Convert(new)
                                    

    indexfor_replacement = 0
    for k in wordsnew3:
            if k in math_dict:
                index = wordsnew3.index(k)
                indexnext = index + 1
                number = index
            
                wordsnew[number] = new2[indexfor_replacement]
                wordsnew[number + 1] = ''
                wordsnew[number + 2] = ''
                indexfor_replacement = indexfor_replacement + 1
                                    


                                

    # part 2 replacing 2 word signs
    wordsnew2 = list(i + " " + j for i, j in zip(wordsnew, wordsnew[1:]))

    new = []
    for wrd in wordsnew2:
            if wrd in dict.keys(math_dict):
    # searchingfrom math_dict
                new.append(math_dict.get(wrd, wrd))
        
            new = ' '.join(new)

            new2 = Convert(new)
                                    



    indexfor_replacement = 0
    for k in wordsnew2:
            if k in math_dict:
                index = wordsnew2.index(k)
                indexnext = index + 1
                number = index
            
    
            
                wordsnew[number] = new2[indexfor_replacement]
                wordsnew[number + 1] = ''
            
        
                indexfor_replacement = indexfor_replacement + 1
                                    


    #part 3 replacing 1 word signs
    for wrd in wordsnew:
    # searching from math_dict
            res.append(math_dict.get(wrd, wrd))
        
    res = ' '.join(res)
                                    
    # printing result 

    res = re.sub(' +', ' ', str(res))
    return res

# if __name__ == '__main__':
#     try:
#         arg = sys.argv[1]
#     except IndexError:
#         arg = None

#     return_val = do_something(arg)