import { Router } from 'express';
import filmController from '../controllers/film.controller';

const router = Router();

router.get('/', filmController.getFilms.bind(filmController));
router.get('/trending', filmController.getTrendingFilms.bind(filmController));
router.get('/search/suggest', filmController.searchSuggest.bind(filmController));
router.get('/:id', filmController.getFilmById.bind(filmController));
router.post('/', filmController.createFilm.bind(filmController));
router.put('/:id', filmController.updateFilm.bind(filmController));
router.delete('/:id', filmController.deleteFilm.bind(filmController));

export default router;
