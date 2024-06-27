<?php

namespace App\Controller;

use App\Repository\MagasinRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class MagasinController extends AbstractController
{
    #[Route('/mon-compte/magasin/{id}/{page}', name: 'mon_compte_shop')]
    public function shop($id, MagasinRepository $magasinRepository, $page = ""): Response
    {
        $findShop = $magasinRepository->findOneBy(['id' => $id]);

        if (!$findShop) {
            return $this->redirectToRoute('index');
        }
        if ($findShop->getUser() !== $this->getUser()) {
            return $this->redirectToRoute('index');
        }

        return $this->render('account/gestion_shop.html.twig', [
            'user' => $this->getUser()
        ]);
    }

    #[Route('/magasin/{id}', name: 'shop_show')]
    public function magasinShow($id, MagasinRepository $magasinRepository): Response
    {
        $findShop = $magasinRepository->findOneBy(['id' => $id]);
        $user = $this->getUser();

        if (!$findShop || !$user) {
            $this->addFlash('danger', 'Le magasin n\'existe pas, ou vous n\'êtes pas connecté.');
            return $this->redirectToRoute('index');
        }

        return $this->render('shop/show.html.twig', [
            'user' => $user,
        ]);
    }

    #[Route('/panier', name: 'cart')]
    public function cart(): Response
    {

        $user = $this->getUser();
        if(!$user){
            $this->addFlash('danger', 'Vous devez être connecté pour accéder à votre panier.');
            return $this->redirectToRoute('app_login');
        }

        return $this->render('shop/show.html.twig', [
            'user' => $user,
        ]);
    }

}
