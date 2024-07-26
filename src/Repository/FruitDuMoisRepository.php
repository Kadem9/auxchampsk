<?php

namespace App\Repository;

use App\Entity\FruitDuMois;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<FruitDuMois>
 *
 * @method FruitDuMois|null find($id, $lockMode = null, $lockVersion = null)
 * @method FruitDuMois|null findOneBy(array $criteria, array $orderBy = null)
 * @method FruitDuMois[]    findAll()
 * @method FruitDuMois[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FruitDuMoisRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, FruitDuMois::class);
    }

//    /**
//     * @return FruitDuMois[] Returns an array of FruitDuMois objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('f.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?FruitDuMois
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
