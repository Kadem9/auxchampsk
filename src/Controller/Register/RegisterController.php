<?php

namespace App\Controller\Register;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use phpDocumentor\Reflection\File;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class RegisterController extends AbstractController
{
    public function __construct(private EntityManagerInterface $em)
    {
    }
    #[Route('/inscription', name: 'register')]
    public function register(Request $request): Response
    {

        return $this->render('login/register.html.twig', [
            'last_username' => '',
            'error' => '',

        ]);

    }

    #[Route('/inscription-validation-finale', name: 'register_validation')]
    public function validationRegister(Request $request, UserRepository $userRepository, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        if ($request->isMethod('POST')) {
            $formData = $request->request->all();

            $firstname = $formData['firstname'];
            $lastname = $formData['lastname'];
            $email = $formData['email'];
            $password = $formData['password'];
            $password_confirm = $formData['password_confirmation'];
            $phone = $formData['phone'];
            $type = $formData['type'];
            $leurre = $formData['leurre'];

            if($leurre != ""){
                return new JsonResponse(['status' => 'error', 'message' => 'Vous êtes un robot']);
            }

            if($userRepository->findOneBy(['email' => $email])){
                return new JsonResponse(['status' => 'error', 'message' => 'Cet email est déjà utilisé']);
            }

            if($password != $password_confirm){
                return new JsonResponse(['status' => 'error', 'message' => 'Les mots de passe ne correspondent pas']);
            }

            $phoneRegex = '/^\+?[0-9]{1,15}$/';
            if (!preg_match($phoneRegex, $phone)) {
                return new JsonResponse(['status' => 'error', 'message' => 'Le numéro de téléphone est invalide']);
            }

            $passwordRegex = '/^(?=.*[A-Z])(?=.*\d).+$/';
            if (!preg_match($passwordRegex, $password)) {
                return new JsonResponse(['status' => 'error', 'message' => 'Le mot de passe doit contenir au moins une majuscule et un chiffre']);
            }

            $user = new User();
            $user->setFirstname($firstname);
            $user->setLastname($lastname);
            $user->setEmail($email);
            $user->setTypeUser($type);

            // Je hash le mdp
            $passHash = $passwordHasher->hashPassword($user, $password);

            $user->setPassword($passHash);
            $user->setPhoneNumber($phone);

            $this->em->persist($user);
            $this->em->flush();

            $this->addFlash('success', 'Inscription réussie');
            return new JsonResponse(['status' => 'success', 'message' => 'Inscription réussie']);

        }
        return new JsonResponse(['status' => 'success']);
    }

    private function uploadFile(): File {

    }
}