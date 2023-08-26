#include<iostream>
using namespace std;

char space[3][3]={{'1','2','3'},{'4','5','6'},{'7','8','9'}};
int row,col;
bool tie;
string p1,p2;
char t='x';
bool n=true;
char a;
bool again=true;
void f1()
{
    if(n==false)
    {
        cout<<"                              UPDATED BOARD      "<<endl<<endl;
    }
    cout<<"                                    |        |       "<<endl;
    cout<<"                                "<<space[0][0]<<"   |   "<<space[0][1]<<"    |   "<<space[0][2]<<"    "<<endl;
    cout<<"                                    |        |       "<<endl;
    cout<<"                              -----------------------"<<endl;
    cout<<"                                    |        |       "<<endl;
    cout<<"                                "<<space[1][0]<<"   |   "<<space[1][1]<<"    |   "<<space[1][2]<<"    "<<endl;
    cout<<"                                    |        |       "<<endl;
    cout<<"                              -----------------------"<<endl;
    cout<<"                                    |        |       "<<endl;
    cout<<"                                "<<space[2][0]<<"   |   "<<space[2][1]<<"    |   "<<space[2][2]<<"    "<<endl;
    cout<<"                                    |        |       "<<endl<<endl<<endl;
}
void f2()
{
    int num;
    if(t=='x')
    {
        cout<<p1<<" please enter position of [x] :  ";
        cin>>num;
        cout<<endl<<endl;
        n=false;
    }
    if(t=='0')
    {
        cout<<p2<<" please enter position of [0] :  ";
        cin>>num;
        cout<<endl<<endl;
        n=false;
    }

    if(num==1)
    {
        row=0;
        col=0;
    }
    else if(num==2)
    {
        row=0;
        col=1;
    }
    else if(num==3)
    {
        row=0;
        col=2;
    }
    else if(num==4)
    {
        row=1;
        col=0;
    }
    else if(num==5)
    {
        row=1;
        col=1;
    }
    else if(num==6)
    {
        row=1;
        col=2;
    }
    else if(num==7)
    {
        row=2;
        col=0;
    }
    else if(num==8)
    {
        row=2;
        col=1;
    }
    else if(num==9)
    {
        row=2;
        col=2;
    }
    else
    {
        cout<<"Invalid !!!"<<endl;
    }

    if(t=='x' && space[row][col]!='x' && space[row][col]!='0')
    {
        space[row][col]='x';
        t='0';
    }
    else if(t=='0' && space[row][col]!='x' && space[row][col]!='0')
    {
        space[row][col]='0';
        t='x';
    }
    else{
        cout<<endl<<"There is no empty space please try again"<<endl;
        f2();
    }
}
bool f3()
{
    for(int i=0;i<3;i++)
    {
        if((space[i][0]==space[i][1] && space[i][0]==space[i][2] )|| (space[0][i]==space[1][i] && space[0][i]==space[2][i]))
        {
            return false;
        }
    }
    if(space[0][0]==space[1][1] && space[1][1]==space[2][2] || space[0][2]==space[1][1] && space[1][1]==space[2][0])
    {
        return false;
    }
    for(int i=0;i<3;i++)
    {
        for(int j=0;j<3;j++)
        {
            if(space[i][j]!='x' && space[i][j]!='0')
            {
                return true;
            }
        }
    }
    tie=true;
    return false;
}
int main()
{
    cout<<"                                      * TIC - TAC - TOE *                 "<<endl<<endl<<endl;
    while(again){
    cout<<"                  Enter the name of player-1 :    ";
    cin>>p1;
    cout<<endl;
    cout<<"                  Enter the name of player-2 :    ";
    cin>>p2;
    cout<<endl<<endl;
     cout<<p1<<" First turn [x] :"<<endl<<p2<<" Second turn [0] :"<<endl<<endl;
    while(f3())
    {
        f1();
        f2();
        f3();
    }
    if(t=='x' && tie==false)
    {
        cout<<endl<<endl<<"------------------------      "<<p2<<" CONGRATS!! you win "<<"    --------------------------------------------------------------"<<endl<<endl<<endl;
    }
    else if(t=='0' && tie==false)
    {
        cout<<endl<<endl<<"------------------------      "<<p1<<" CONGRATS!! you win "<<"    --------------------------------------------------------------"<<endl<<endl<<endl;
    }
    else
    {
        cout<<" DRAW! "<<endl<<endl<<endl;
    }
    cout<<"Do you want to play again ? Y/N :      ";
    cin>>a;
    if(a=='Y')
    {
        again=true;
    }
    else if(a=='N')
    {
        again=false;
        cout<<"************************************      THANK YOU      **************************************************************"<<endl<<endl<<endl;
    }
    else
    {
        cout<<" please enter valid answer (Y/N) "<<endl<<endl;
        again=false;
    }
    }

}





