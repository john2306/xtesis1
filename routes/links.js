var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var url = require('url');

/* GET home page. */

router.get('/', (req, res, next) => {
    var str = req.query.busqueda;
    if (str.length == '')
        res.render('pages/noTheme');

    else {
        var buscar1 = str.trim();
        var buscar2 = buscar1.split(' ');

        var num = new Array(1000);
        var nuevo = 0;
        var suma = 0;
        for (var ini = 0; ini < 1000; ini++) {

            for (var index = nuevo; index < buscar1.length; index++) {
                if (buscar2[index] != '') {
                    num[ini] = buscar2[index];
                    suma += 1;
                    nuevo = index + 1;
                    index = 100000;
                }
            }

        }

        var arrayPages = new Array(1000);
        arrayPages = ['Google Scholar', 'Redalyc', 'Microsoft Academic', 'Dialnet', 'Scholarpedia', 'Springlink', 'Redlatinos', 'Scielo', 'Reefseek', 'Cern', 'IEEE', 'Wiley', 'Base', 'Wws', 'Eric', 'Scienceresearch', 'Iseek', 'Sciencedirect', 'Elsevier', 'Wikipedia', 'Cienciasciencegov', 'Highbeam'];
        var enlaces = new Array(1000);

        const paginasPrincipal = {
            'Google Scholar': 'https://scholar.google.es/scholar?hl=es&as_sdt=0%2C5&q=',
            'Redalyc': 'http://www.redalyc.org/busquedaArticuloFiltros.oa?q=',
            'Microsoft Academic': 'https://academic.microsoft.com/#/search?iq=@',
            'Dialnet': 'https://dialnet.unirioja.es/buscar/documentos?querysDismax.DOCUMENTAL_TODO=',
            'Scholarpedia': 'http://www.scholarpedia.org/w/index.php?search=',
            'Springlink': 'https://link.springer.com/search?query=',
            'Redlatinos': 'http://repositorioslatinoamericanos.uchile.cl/discover?query=',
            'Scielo': 'https://search.scielo.org/?q=&lang=pt&count=15&from=0&output=site&sort=&format=summary&fb=&page=1&q=',
            'Reefseek': 'https://www.refseek.com/search?q=',
            'Cern': 'http://cds.cern.ch/search?ln=es&p=',
            'IEEE': 'https://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText=',
            'Wiley': 'https://onlinelibrary.wiley.com/action/doSearch?AllField=',
            'Base': 'https://www.base-search.net/Search/Results?lookfor=',
            'Wws': 'https://worldwidescience.org',
            'Eric': 'https://eric.ed.gov/?q=',
            'Scienceresearch': 'http://scienceresearch.com/scienceresearch/result-list/collections:SCRNATGEONEWS,SCRRSP,SCRSPIR,MED-FDAD,SCRAMS,SCRNSCAN,SCRGEOSA,SCRIUPAC,SCRARST,SCRCDER,SCIDERDA,INTUTE,SCRSD,SCRTHIEME,CDER,ESN-CRS,MEDLINEPLUS-2,SCRCDC,SCRNPDB,SCRSN,SCRNIH,SCRNASWEB,SCRTRIS,DTIC-RDDS,SCRNATACS,SCRWWS,SCRNGESPI,SCRFAOUN,SCRDERDP,ASMINTL,DOE-PATENT-XML,HEL-COCLIB,SCRAME,SCRELSD,NGC,EF-NSR,SCRYANWS,DTIC-SCAMPI,SCRBIOONE,SCRNSF,SCIGOV-SIMPLE,SCRCHMID,HEL-FEDST,SCRDTICST,SCRNCI,SCRAAOB,SCRHIPUBC,SCRUPTO,SCRJOURW,SCRASJOUR,SUSMS,SCRCIPO,SCROXPRESS,SCREPAOD,SCRNBIOII,SCRAAELIB,SCRBIOCEN,SCRNIHCA,SCRWINS,MED-EKNIH,MEDHM,SCRSPACE,SCRCALAS,SCRDOEIB,SCRASCE,MRS-NOPR,MED-WEB,SCRASM,SCRELESOC,SCREPAPF,SCRACM,EPOJP,SCREPATIP,SCRASLOC,SCRBLD,SCRHUBST,SCRACS,SCRMMMS,SCRBAND,SCRUGCS,CANRESCOUNCIL,HEL-NPRATD,SCRAGRB,AMA-JAMA,SCRNNIE,SCRENHP,SCRNOAAPL,TOXNETTOXLINE,NSSN,SCREPRI,SCRAGRA,SCRBENVRAD,SCRBIJOUR,HEL-MAYO,SCRESWIB,SCRTEKTRAN,SCROEP,SCRIEA,SCRSCH,MEDPUBMED,SCRAAPHY,SRCGISDB,SCRUDLOS,SCRANNRE,EPOWIPO,SCRIAEA,SCRRSCPUB,SCRENVPA,SCRASPB,SCRUCPJ,SCRBITERA,SCRSSCTR,HEL-WHO,FDA-CBER,SIAM,DOD-WST,SCREIA,SCRSCIMAG,SCRMSE,SCRUSGSPUBS,SCRSEGEO,SCRDOAR,SCRSPEXP,SCRNTIS,SCRKARPUB,SCRIGCNT,SCRNATAP,SCRNACE,SCRWMW,SCREPASI,SCRDODBIOR,SCRCELLPR,SRBIOMB,SCRARMP,SCRNICHWBK,SCRBIOIO,SCRNASTRS,SCRSCIA,SCRAPI,SCRGPD,SCRUSECS,SCRBFIN,SCRCFSAN,SCRNASADS,SCRFERM,PUBMED,SCITOPIA,SCRMCB,AACR,SCRERSD,SCROAISTER,SCRHRD,SCRPROSOC,SCRANS,DTIC-AULIMP,SCRPLANDS,SCRNISTDG,SCRNATPUGR,SCRTFGRP,DOE-RDPROD,SCRUSDEPD,CLINICALTRIALS,SCRPOP,SCISPR,HEL-IMPRO,SCRIEEE,SCRSSSAJ,NLSWED-KAROLINSKA,SCRHWPRE/fullRecord:',
            'Iseek': 'http://www.iseek.com/iseek/search.html?l=&query=',
            'Sciencedirect': 'https://www.sciencedirect.com/search?qs=',
            'Elsevier': 'https://www.elsevier.com/search-results?query=',
            'Wikipedia': 'https://es.wikipedia.org/w/index.php?title=Especial:Buscar&search=',
            'Cienciasciencegov': 'https://ciencia.science.gov/ciencia/desktop/es/results.html',
            'Highbeam': 'https://www.highbeam.com/Search?searchTerm=',

        }

        const paginasComplemento = {
            'Google Scholar': '&btnG=',
            'Redalyc': '&idp=1',
            'Microsoft Academic': '&filters=&from=0&sort=0',
            'Dialnet': '',
            'Scholarpedia': '&title=Special%3ASearch',
            'Springlink': '&facet-content-type="Journal"',
            'Redlatinos': '&submit=',
            'Scielo': '&lang=pt&page=1',
            'Reefseek': '',
            'Cern': '&action_search=Buscar&op1=a&m1=a&p1=&f1=&c=CERN+Document+Server&sf=&so=d&rm=&rg=10&sc=1&of=hb',
            'IEEE': '',
            'Wiley': '',
            'Base': '&name=&oaboost=1&newsearch=1&refid=dcbases',
            'Wws': '',
            'Eric': '',
            'Scienceresearch': '+/',
            'Iseek': '&sbl=2&as=QXwI%2bra68WMBCaJnnl0MXgJqJ2EA6bc5&bk=&pc=',
            'Sciencedirect': '&show=25&sortBy=relevance',
            'Elsevier': '&labels=all&page=1',
            'Wikipedia': '&searchToken=3vnslu0nxelnzrtbwhxwpk90x',
            'Cienciasciencegov': '',
            'Highbeam': '',

        }

        paginaFinal = new Array(arrayPages.length);
        for (let i = 0; i < arrayPages.length; i++) {
            for (let k = 0; k < 1000; k++) {
                if (num[k] != undefined && arrayPages[i] != 'Microsoft' && arrayPages[i] != 'Wws' && arrayPages[i] != 'Cienciasciencegov') {
                    paginasPrincipal[arrayPages[i]] = paginasPrincipal[arrayPages[i]] + num[k] + '+';
                }
                if (arrayPages[i] === 'Microsoft' && num[k] != undefined) {
                    paginasPrincipal[arrayPages[i]] = `https://academic.microsoft.com/#/search?iq=@${str}@&q=${str}`
                }

            }
            paginasPrincipal[arrayPages[i]] = paginasPrincipal[arrayPages[i]] + paginasComplemento[arrayPages[i]];
            paginaFinal[i] = paginasPrincipal[arrayPages[i]];
        }

        res.render('pages/linksTheme', {
            paginaFinal,
            arrayPages,
            str
        });

    }
})


module.exports = router;