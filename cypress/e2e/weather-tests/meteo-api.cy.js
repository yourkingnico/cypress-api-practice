describe('Weather API tests', () => {
    const baseUrl = 'https://api.open-meteo.com/v1/forecast';

    it('should get weather for Los Angeles with valid lat/long', () => {

        // data for downtown Los Angeles
        const lat = 34.054245;
        const long = -118.26599;
        const timeZone = "GMT";

        cy.request({
            method: 'GET',
            url: `${baseUrl}?latitude=${lat}&longitude=${long}&hourly=temperature_2m`
        }).then((response) => {
            expect(response.status).to.eq(200);
            console.log(response.body)

            // Check expected data
            expect(response.body.elevation).to.equal(107)
            expect(response.body.generationtime_ms).to.exist;

            expect(response.body).to.have.property('hourly');
            expect(response.body.hourly).to.have.property('time');
            expect(response.body.hourly).to.have.property('temperature_2m');
            expect(response.body.hourly.temperature_2m).to.be.an('array');

            expect(response.body.latitude).to.equal(lat);
            expect(response.body.longitude).to.equal(long);
            expect(response.body.timezone).to.equal(timeZone);
        });
    })

    it('should return errors for invalid string input', () => {

        const lat = 34.054245;
        const long = undefined;

        cy.request({
            method: 'GET',
            url: `${baseUrl}?latitude=${lat}&longitude=${long}&hourly=temperature_2m`,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.error).to.equal(true);
            expect(response.body.reason).to.equal("Data corrupted at path ''. Cannot initialize Float from invalid String value undefined.");
        });
    })

    it('should return errors for invalid longitude input', () => {

        const lat = 34.054245;
        const long = 9999999;

        cy.request({
            method: 'GET',
            url: `${baseUrl}?latitude=${lat}&longitude=${long}&hourly=temperature_2m`,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.error).to.equal(true);
            expect(response.body.reason).to.equal("Longitude must be in range of -180 to 180°. Given: 9999999.0.");
        });
    })

    it('should return errors for invalid latitude input', () => {

        const lat = 9999999;
        const long = -123.123;

        cy.request({
            method: 'GET',
            url: `${baseUrl}?latitude=${lat}&longitude=${long}&hourly=temperature_2m`,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.error).to.equal(true);
            expect(response.body.reason).to.equal("Latitude must be in range of -90 to 90°. Given: 9999999.0.");
        });
    })

    it('should return errors for invalid http method POST', () => {

        const lat = 34.054245;
        const long = -118.26599;

        cy.request({
            method: 'POST',
            url: `${baseUrl}?latitude=${lat}&longitude=${long}&hourly=temperature_2m`,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(415);
            expect(response.body.error).to.equal(true);
            expect(response.body.reason).to.equal("Can't decode data without a content type");
        });
    })

    it.only('should return errors for invalid http method DELETE', () => {

        const lat = 34.054245;
        const long = -118.26599;

        cy.request({
            method: 'DELETE',
            url: `${baseUrl}?latitude=${lat}&longitude=${long}&hourly=temperature_2m`,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body.error).to.equal(true);
            expect(response.body.reason).to.equal("Not Found");
        });
    })
})