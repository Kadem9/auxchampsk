<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    #[Route(path: '/connexion', name: 'app_login')]
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        if ($this->getUser()) {
            $user = $this->getUser();

            if ($user->isHasSeenWelcomePage()) {
                return $this->redirectToRoute('index');
            }
            return $this->redirectToRoute('welcome');
        }

        $error = $authenticationUtils->getLastAuthenticationError();
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('login/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    }

    #[Route(path: '/deconnexion', name: 'app_logout')]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }

    #[Route('/bienvenue', name: 'welcome')]
    public function welcome(EntityManagerInterface $em, Security $security): Response
    {
        $user = $security->getUser();

        if ($user instanceof User) {

            if ($user->isHasSeenWelcomePage()) {
                return $this->redirectToRoute('index');
            }
            $user->setHasSeenWelcomePage(true);
            $em->persist($user);
            $em->flush();
        }

        return $this->render('welcome/welcome.html.twig');
    }
}
