<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class IndexController extends AbstractController
{
    #[Route('/{page}', name: 'index')]
    public function index($page = ''): Response
    {

        return $this->render('index.html.twig', [
        ]);
    }

    #[Route('/mon-compte/{page}', name: 'mon-compte')]
    public function account($page = ''): Response
    {

        return $this->render('index.html.twig', [
        ]);
    }
}