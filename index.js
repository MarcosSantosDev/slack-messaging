'use strict'

const axios = require('axios');
require('dotenv').config();

const getData = async () => {
    const result = await axios.get('https://next.json-generator.com/api/json/get/4JJYrbRxu');

    return result.data.map(person => ({
        age: person.age,
        email: person.email,
        firstname: person.name.first,
        lastname: person.name.last,
    }));
}

(
    async () => {
        try {
            // Get the data
            const peoples = await getData();

            // Body slack
            const slackBody = {
                mkdwn: true,
                text: "Lista de usuários!",
                attachments: peoples.map(person => ({
                    color: "good",
                    text: `*Usuário ${person.firstname} ${person.lastname}, possui endereço de email ${person.email} e idade de ${person.age} anos.`
                }))
            };

            const { SLACK_KEY1, SLACK_KEY2, SLACK_KEY3 } = process.env;

            // Post slack
            const response = await axios({
                method: "post",
                url: `https://hooks.slack.com/services/${SLACK_KEY1}/${SLACK_KEY2}/${SLACK_KEY3}`,
                data: slackBody
            });
        } catch (error) {
            throw error;
        }
    }
)();