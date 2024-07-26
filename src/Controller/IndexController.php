<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class IndexController extends AbstractController
{
    #[Route('/', name: 'index')]
    public function index($page = ''): Response
    {
        $user = "";
        if($this->getUser()){
            $user = $this->getUser();
        } else {
            // je renvoie un user anonyme avec un id null en JSON
            $user = json_encode([
                'id' => null,
                'email' => null,
                'roles' => null
            ]);
        }

        return $this->render('index/index.html.twig', [
            'user' => $user
        ]);
    }

    #[Route('/mon-compte', name: 'mon_compte')]
    public function account($page = ''): Response
    {

        if(!$this->getUser()){
            return $this->redirectToRoute('app_login');
        }

        return $this->render('account/account.html.twig', [
            'user' => $this->getUser()
        ]);
    }

    #[Route('/infos', name: 'infos')]
    public function infos($page = ''): Response
    {

        return $this->render('infos/infos.html.twig', [
        ]);
    }

    #[Route('/profil/fermier/{id}', name: 'profil_fermier')]
    public function profil($id = ''): Response
    {

        return $this->render('infos/infos.html.twig', [
        ]);
    }

    }