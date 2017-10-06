var lrs;

$(document).ready(function () {
    try {
        lrs = new TinCan.LRS({
            endpoint: "https://testcompro.waxlrs.com/TCAPI/",
            username: "P4ErVSmRGxLJcIFCd9Ri",
            password: "R9IGJ2fFiSizmd2q1EbN",
            allowFail: false
        });
    } catch (ex) {
        console.log("Failed to setup LRS object: ", ex);
        // TODO: do something with error, can't communicate with LRS
    }
});

var createStatement = function (statementIndex) {
    var statements = [
        {
            actor: {
                mbox: "mailto:info@tincanapi.com"
            },
            verb: {
                id: "http://adlnet.gov/expapi/verbs/experienced"
            },
            target: {
                id: "http://rusticisoftware.github.com/TinCanJS"
            }
        },
        {
            actor: {
                mbox: "mailto:info@tincanapi.com"
            },
            verb: {
                id: "http://adlnet.gov/expapi/verbs/experienced"
            },
            target: {
                id: "http://rusticisoftware.github.com/TinCanJS"
            }
        },
        {
            actor: {
                mbox: "mailto:info@tincanapi.com"
            },
            verb: {
                id: "http://adlnet.gov/expapi/verbs/experienced"
            },
            target: {
                id: "http://rusticisoftware.github.com/TinCanJS"
            }
        },
        {
            actor: {
                mbox: "mailto:info@tincanapi.com"
            },
            verb: {
                id: "http://adlnet.gov/expapi/verbs/experienced"
            },
            target: {
                id: "http://rusticisoftware.github.com/TinCanJS"
            }
        }
    ];
    var statement = new TinCan.Statement(
        statements[statementIndex]
    );
    return statement;
};

var saveStatement = function (statement) {
    if (lrs) {
        lrs.saveStatement(
            statement, {
                callback: function (err, xhr) {
                    if (err !== null) {
                        if (xhr !== null) {
                            console.log("Failed to save statement: " + xhr.responseText + " (" + xhr.status + ")");
                            // TODO: do something with error, didn't save statement
                            return;
                        }

                        console.log("Failed to save statement: " + err);
                        // TODO: do something with error, didn't save statement
                        return;
                    }

                    console.log("Statement saved");
                    // TOOO: do something with success (possibly ignore)
                }
            }
        );
    }
};

var queryStatements = function () {
    if (lrs) {
        lrs.queryStatements({
            params: {
                /*verb: new TinCan.Verb({
                    id: "http://adlnet.gov/expapi/verbs/experienced"
                }),*/
                agent: new TinCan.Agent({
                   mbox: "mailto:info@tincanapi.com"
                }),
                limit: 5,
                since: "2017-07-05T08:34:16Z"
            },
            callback: function (err, sr) {
                if (err !== null) {
                    console.log("Failed to query statements: " + err);
                    // TODO: do something with error, didn't get statements
                    return;
                }

                if (sr.more !== null) {
                    // TODO: additional page(s) of statements should be fetched
                    console.log('More statements available');
                    console.log(sr.more);
                }
                console.log(sr.statements);
                // TODO: do something with statements in sr.statements
            }
        });
    }
};

$('.sendStatement').click(function () {
    var statementIndex = parseInt($(this).data("index"));
    saveStatement(createStatement(statementIndex));
});

$('.getStatement').click(function () {
    queryStatements();
});
