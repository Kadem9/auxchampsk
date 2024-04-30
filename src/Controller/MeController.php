<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class MeController extends AbstractController
{
    #[Route('/api/me/{email}', name: 'me_email', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function findUserByMail(UserRepository $userRepository, $email): JsonResponse
    {
        $user = $userRepository->findOneBy(['email' => $email]);

        return $this->json($user);
    }
}
