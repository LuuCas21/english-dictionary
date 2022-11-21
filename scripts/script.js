'use script';

const audio = document.querySelector('.fa-volume-up');
const wordResult = document.querySelector('.word_result');
const wordCategory = document.querySelector('.category');
const wordPhonetic = document.querySelector('.phonetic');
const getInputBtn = document.querySelector('.fa-search');
const wordSource = document.querySelector('.source_link');

let word = 'apple';
//const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
let audios = [];

const dictionary = async () => {

    let getInput = document.querySelector('#search_box').value;

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${getInput}`;

    document.querySelector('.definition').querySelectorAll('.noun').forEach(els => {
        //els.style.display = 'none';
        document.querySelector('.definition').removeChild(els);
    });

    document.querySelector('.definition').querySelectorAll('.adjective').forEach(els => {
        //els.style.display = 'none';
        document.querySelector('.definition').removeChild(els);
    });

    document.querySelector('.definition').querySelectorAll('.verb').forEach(els => {
        //els.style.display = 'none';
        document.querySelector('.definition').removeChild(els);
    });

    document.querySelector('.definition').querySelectorAll('.interjection').forEach(els => {
        //els.style.display = 'none';
        document.querySelector('.definition').removeChild(els);
    });

    document.querySelector('.definition').querySelectorAll('.adverb').forEach(els => {
        //els.style.display = 'none';
        document.querySelector('.definition').removeChild(els);
    });

    document.querySelector('.synonymous').querySelectorAll('p').forEach(els => {
        els.style.display = 'none';
    });

    document.querySelector('.antonymous').querySelectorAll('p').forEach(els => {
        els.style.display = 'none';
    });

    document.querySelector('.word').querySelectorAll('.category').forEach(els => {
        els.style.display = 'none';
    });
    
    if (getInput) {
    const get_data = await fetch(url);
    const data = await get_data.json();

    audios.push(data[0].phonetics[0].audio || data[0].phonetics[1].audio || data[0].phonetics[2].audio || data[0].phonetics[3].audio || data[0].phonetics[4].audio)
    //console.log(audios[audios.length - 1]);

    audio.addEventListener('click', () => {
        playAudio(audios[audios.length - 1])

    });

    wordResult.innerHTML = capitalizeFirstLetter(data[0].word)
    //wordCategory.innerHTML = capitalizeFirstLetter(data[0].meanings[0].partOfSpeech);
    wordPhonetic.innerHTML = data[0].phonetics[0].text || data[0].phonetics[1].text || data[0].phonetics[2].text || data[0].phonetics[3].text || data[0].phonetics[4].text;
    wordSource.innerHTML = `Source: ${data[0].sourceUrls[0]}`;

    if (data[0].meanings.length >= 1) {

        data[0].meanings.forEach(els => {
            const category_word = document.createElement('p');
            category_word.setAttribute('class', 'category');
            category_word.setAttribute('category', els.partOfSpeech);
            category_word.style.cursor = 'pointer';
            category_word.style.color = 'blue';

            category_word.innerHTML = els.partOfSpeech.charAt(0).toUpperCase() + els.partOfSpeech.slice(1);
            document.querySelector('.word').appendChild(category_word);
        })
    }

    document.querySelector('.word').addEventListener('click', (e) => {
        /*const adj_para = document.createElement('p');
        adj_para.setAttribute('category_word', 'adjective');

        const definition_para = document.createElement('p');
        definition_para.setAttribute('category_word', 'noun');*/

        document.querySelector('.definition').querySelectorAll('.noun').forEach(els => {
        //els.style.display = 'none';
        document.querySelector('.definition').removeChild(els);
        });

        //console.log(e.target);


        if (e.target.getAttribute('category') === 'adjective') {
            /*document.querySelector('.definition').querySelectorAll('.noun').forEach(els => {
            //els.style.display = 'none';
            document.querySelector('.definition').removeChild(els);
            });*/
            document.querySelector('.definition').querySelectorAll('.adjective').forEach(els => {
                //els.style.display = 'none';
                document.querySelector('.definition').removeChild(els);
            });

            //console.log('adjective');

            data[0].meanings.forEach((els) => {
                const adj_para = document.createElement('p');
                adj_para.setAttribute('category_word', 'adjective');

                if (els.partOfSpeech === adj_para.getAttribute('category_word')) {

                    els.definitions.forEach((els2, i) => {
                    const adj_para = document.createElement('p');
                    //adj_para.setAttribute('category_word', 'adjective');
                    adj_para.setAttribute('class', 'adjective');
                    adj_para.innerHTML = `${i + 1} - ${els2.definition}`;

                    document.querySelector('.definition').querySelectorAll('.noun').forEach(els => {
                    //els.style.display = 'none';
                    document.querySelector('.definition').removeChild(els);
                    });

                    document.querySelector('.definition').querySelectorAll('.verb').forEach(els => {
                        //els.style.display = 'none';
                        document.querySelector('.definition').removeChild(els);
                    });

                    document.querySelector('.definition').querySelectorAll('.adverb').forEach(els => {
                        //els.style.display = 'none';
                        document.querySelector('.definition').removeChild(els);
                    });

                    document.querySelector('.definition').appendChild(adj_para);

                    adj_para.addEventListener('mouseover', () => {
                        //console.log(els2.example);
                        if (els2.example) {
                        document.querySelector('.example').style.display = 'block';
                        document.querySelector('.example_para').innerHTML = els2.example;
                        } else {
                            document.querySelector('.example').style.display = 'block';
                            document.querySelector('.example_para').innerHTML = 'Any example found';
                        }
                    })

                    adj_para.addEventListener('mouseout', () => {
                        //console.log(els2.example);
                        document.querySelector('.example').style.display = 'none';
                        document.querySelector('.example_para').innerHTML = '';
                    })

                    });

                }
            })

        } else if (e.target.getAttribute('category') === 'noun') {
            /*document.querySelector('.definition').querySelectorAll('.adjective').forEach(els => {
            //els.style.display = 'none';
            document.querySelector('.definition').removeChild(els);
            });*/
            document.querySelector('.definition').querySelectorAll('.noun').forEach(els => {
                //els.style.display = 'none';
                document.querySelector('.definition').removeChild(els);
            });

            //console.log('noun')

            /*const definition_para = document.createElement('p');
            definition_para.setAttribute('category_word', 'noun');*/

            data[0].meanings.forEach((els) => {
                const definition_para = document.createElement('p');
                definition_para.setAttribute('category_word', 'noun');

                if (els.partOfSpeech === definition_para.getAttribute('category_word')) {

                    els.definitions.forEach((els2, i) => {
                    const definition_para = document.createElement('p');
                    //definition_para.setAttribute('category_word', 'noun');
                    definition_para.setAttribute('class', 'noun');
                    definition_para.innerHTML = `${i + 1} - ${els2.definition}`;

                    document.querySelector('.definition').querySelectorAll('.adjective').forEach(els => {
                    //els.style.display = 'none';
                    document.querySelector('.definition').removeChild(els);
                    });

                    document.querySelector('.definition').querySelectorAll('.verb').forEach(els => {
                        //els.style.display = 'none';
                        document.querySelector('.definition').removeChild(els);
                    });

                    document.querySelector('.definition').querySelectorAll('.interjection').forEach(els => {
                        //els.style.display = 'none';
                        document.querySelector('.definition').removeChild(els);
                    });

                    document.querySelector('.definition').querySelectorAll('.adverb').forEach(els => {
                        //els.style.display = 'none';
                        document.querySelector('.definition').removeChild(els);
                    });

                    document.querySelector('.definition').appendChild(definition_para);

                    definition_para.addEventListener('mouseover', () => {
                        //console.log(els2.example);
                        if (els2.example) {
                        document.querySelector('.example').style.display = 'block';
                        document.querySelector('.example_para').innerHTML = els2.example;
                        } else {
                            document.querySelector('.example').style.display = 'block';
                            document.querySelector('.example_para').innerHTML = 'Any example found';
                        }
                    })

                    definition_para.addEventListener('mouseout', () => {
                        //console.log(els2.example);
                        document.querySelector('.example').style.display = 'none';
                        document.querySelector('.example_para').innerHTML = '';
                    })

                    })
                }
            })

        } else if (e.target.getAttribute('category') === 'verb') {
            document.querySelector('.definition').querySelectorAll('.verb').forEach(els => {
            //els.style.display = 'none';
            document.querySelector('.definition').removeChild(els);
            });

            //console.log('verb')

            data[0].meanings.forEach((els) => {
                const verb_para = document.createElement('p');
                verb_para.setAttribute('category_word', 'verb');

                if (els.partOfSpeech === verb_para.getAttribute('category_word')) {

                    els.definitions.forEach((els2, i) => {
                    const verb_para = document.createElement('p');
                    //adj_para.setAttribute('category_word', 'adjective');
                    verb_para.setAttribute('class', 'verb');
                    verb_para.innerHTML = `${i + 1} - ${els2.definition}`;

                    document.querySelector('.definition').querySelectorAll('.noun').forEach(els => {
                    //els.style.display = 'none';
                    document.querySelector('.definition').removeChild(els);
                    });

                    document.querySelector('.definition').querySelectorAll('.adjective').forEach(els => {
                        //els.style.display = 'none';
                        document.querySelector('.definition').removeChild(els);
                    });

                    document.querySelector('.definition').querySelectorAll('.interjection').forEach(els => {
                        //els.style.display = 'none';
                        document.querySelector('.definition').removeChild(els);
                    });

                    document.querySelector('.definition').querySelectorAll('.adverb').forEach(els => {
                        //els.style.display = 'none';
                        document.querySelector('.definition').removeChild(els);
                    });

                    document.querySelector('.definition').appendChild(verb_para);

                    verb_para.addEventListener('mouseover', () => {
                        //console.log(els2.example);
                        if (els2.example) {
                        document.querySelector('.example').style.display = 'block';
                        document.querySelector('.example_para').innerHTML = els2.example;
                        } else {
                            document.querySelector('.example').style.display = 'block';
                            document.querySelector('.example_para').innerHTML = 'Any example found';
                        }
                    })

                    verb_para.addEventListener('mouseout', () => {
                        //console.log(els2.example);
                        document.querySelector('.example').style.display = 'none';
                        document.querySelector('.example_para').innerHTML = '';
                    })

                    })
                }
            })


        } else if (e.target.getAttribute('category') === 'interjection') {
            document.querySelector('.definition').querySelectorAll('.interjection').forEach(els => {
                //els.style.display = 'none';
                document.querySelector('.definition').removeChild(els);
            });

            //console.log('interjection');

            data[0].meanings.forEach((els) => {
                const interjection_para = document.createElement('p');
                interjection_para.setAttribute('category_word', 'interjection');

                if (els.partOfSpeech === interjection_para.getAttribute('category_word')) {

                    els.definitions.forEach((els2, i) => {
                    const interjection_para = document.createElement('p');
                    //adj_para.setAttribute('category_word', 'adjective');
                    interjection_para.setAttribute('class', 'verb');
                    interjection_para.innerHTML = `${i + 1} - ${els2.definition}`;

                    document.querySelector('.definition').querySelectorAll('.noun').forEach(els => {
                    //els.style.display = 'none';
                    document.querySelector('.definition').removeChild(els);
                    });

                    document.querySelector('.definition').querySelectorAll('.adjective').forEach(els => {
                        //els.style.display = 'none';
                        document.querySelector('.definition').removeChild(els);
                    });

                    document.querySelector('.definition').querySelectorAll('.verb').forEach(els => {
                        //els.style.display = 'none';
                        document.querySelector('.definition').removeChild(els);
                    });

                    document.querySelector('.definition').querySelectorAll('.adverb').forEach(els => {
                        //els.style.display = 'none';
                        document.querySelector('.definition').removeChild(els);
                    });

                    document.querySelector('.definition').appendChild(interjection_para);

                    interjection_para.addEventListener('mouseover', () => {
                        //console.log(els2.example);
                        if (els2.example) {
                        document.querySelector('.example').style.display = 'block';
                        document.querySelector('.example_para').innerHTML = els2.example;
                        } else {
                            document.querySelector('.example').style.display = 'block';
                            document.querySelector('.example_para').innerHTML = 'Any example found';
                        }
                    })

                    interjection_para.addEventListener('mouseout', () => {
                        //console.log(els2.example);
                        document.querySelector('.example').style.display = 'none';
                        document.querySelector('.example_para').innerHTML = '';
                    })

                    })
                }
            })

        } else if (e.target.getAttribute('category') === 'adverb') {
            document.querySelector('.definition').querySelectorAll('.adverb').forEach(els => {
                //els.style.display = 'none';
                document.querySelector('.definition').removeChild(els);
            });

            //console.log('adverb');

            data[0].meanings.forEach((els) => {
                const adverb_para = document.createElement('p');
                adverb_para.setAttribute('category_word', 'adverb');

                if (els.partOfSpeech === adverb_para.getAttribute('category_word')) {

                    els.definitions.forEach((els2, i) => {
                    const adverb_para = document.createElement('p');
                    //adj_para.setAttribute('category_word', 'adjective');
                    adverb_para.setAttribute('class', 'verb');
                    adverb_para.innerHTML = `${i + 1} - ${els2.definition}`;

                    document.querySelector('.definition').querySelectorAll('.noun').forEach(els => {
                    //els.style.display = 'none';
                    document.querySelector('.definition').removeChild(els);
                    });

                    document.querySelector('.definition').querySelectorAll('.adjective').forEach(els => {
                        //els.style.display = 'none';
                        document.querySelector('.definition').removeChild(els);
                    });

                    document.querySelector('.definition').querySelectorAll('.verb').forEach(els => {
                        //els.style.display = 'none';
                        document.querySelector('.definition').removeChild(els);
                    });

                    document.querySelector('.definition').querySelectorAll('.interjection').forEach(els => {
                        //els.style.display = 'none';
                        document.querySelector('.definition').removeChild(els);
                    });

                    document.querySelector('.definition').appendChild(adverb_para);

                    adverb_para.addEventListener('mouseover', () => {
                        //console.log(els2.example);
                        if (els2.example) {
                        document.querySelector('.example').style.display = 'block';
                        document.querySelector('.example_para').innerHTML = els2.example;
                        } else {
                            document.querySelector('.example').style.display = 'block';
                            document.querySelector('.example_para').innerHTML = 'Any example found';
                        }
                    })

                    adverb_para.addEventListener('mouseout', () => {
                        //console.log(els2.example);
                        document.querySelector('.example').style.display = 'none';
                        document.querySelector('.example_para').innerHTML = '';
                    })

                    })
                }
            })

        } else {
            console.log('Error');
        }
    })

    // As definições das palavras já aparecerão automaticamente ao pesquisar por ela

    data[0].meanings[0].definitions.forEach((els, i) => {
        const definition_para = document.createElement('p');
        definition_para.setAttribute('category_word', 'noun');
        definition_para.setAttribute('class', 'noun');

        definition_para.innerHTML = `${i + 1} - ${els.definition}`;

        document.querySelector('.definition').appendChild(definition_para);
        
        /*definition_para.addEventListener('mouseover', () => {
            console.log(els.example);
        })*/

        definition_para.addEventListener('mouseover', () => {
            //console.log(els.example);
            if (els.example) {
            document.querySelector('.example').style.display = 'block';
            document.querySelector('.example_para').innerHTML = els.example;
            } else {
                document.querySelector('.example').style.display = 'block';
                document.querySelector('.example_para').innerHTML = 'Any example found';
            }
        })

        definition_para.addEventListener('mouseout', () => {
            //console.log(els.example);
            document.querySelector('.example').style.display = 'none';
            document.querySelector('.example_para').innerHTML = '';
        })
    });

    data[0].meanings[0 || 1 || 2 || 3].synonyms.forEach((els, i) => {

        const synonyms_para = document.createElement('p');

        synonyms_para.innerHTML = `${i + 1} - ${els}`;

        document.querySelector('.synonymous').appendChild(synonyms_para);
    })

    data[0].meanings[0 || 1 || 2 || 3].antonyms.forEach((els, i) => {
    
        const antonyms_para = document.createElement('p');

        antonyms_para.innerHTML = `${i + 1} - ${els}`;

        document.querySelector('.antonymous').appendChild(antonyms_para);
    })

    //console.log(data);
    //console.log(data[0].phonetics[0].audio || data[0].phonetics[1].audio || data[0].phonetics[2].audio || data[0].phonetics[3].audio || data[0].phonetics[4].audio)
}

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

function definitionWordBox(definitionEl) {
    definitionEl.forEach((els, i) => {
        const definition_para = document.createElement('p');
        definition_para.innerHTML = `${i + 1} - ${els.definition}`;

        document.querySelector('.definition').appendChild(definition_para);
    });
}

/*for (let i = 0; i < data[0].meanings[0].definitions.length; i++) {
        const definition_para = document.createElement('p');
        definition_para.innerHTML = `${i + 1} - ${data[0].meanings[0].definitions[i].definition}`;
        document.querySelector('.definition').appendChild(definition_para);
    }*/

let text = 'hello world';
let letter = text.charAt(0).toUpperCase() + text.slice(1);

const playAudio = (file) => {
    let audioFile = new Audio(file);
    audioFile.play();

    //console.log(audioFile); // audioFile is storing all the mp3 file.
};