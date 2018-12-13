// Mirrored from Nolan/Daccio

module.exports = function (field) {
	return function (next) {
		this.populate(field);
		next();
	}
}
