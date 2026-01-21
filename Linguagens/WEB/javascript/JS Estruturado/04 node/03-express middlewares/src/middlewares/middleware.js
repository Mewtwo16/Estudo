module.exports = (req,res,next) => {
    console.log();
    console.log('Passei no middlreware');
    console.log();
    next();
}